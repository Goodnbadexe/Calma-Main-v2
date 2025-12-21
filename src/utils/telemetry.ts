/**
 * Supreme Design System - Telemetry & Analytics
 * Comprehensive user interaction and performance monitoring
 */

// Telemetry Event Types
export type TelemetryEventType = 
  | 'click' 
  | 'hover' 
  | 'scroll' 
  | 'input' 
  | 'pageview' 
  | 'performance' 
  | 'error' 
  | 'form_interaction'
  | 'navigation'
  | 'media_interaction';

// Base Telemetry Event Structure
export interface TelemetryEvent {
  event_type: TelemetryEventType;
  timestamp: string; // ISO-8601 format
  session_id: string;
  page_id: string;
  user_agent?: string;
  viewport: {
    w: number;
    h: number;
  };
}

// Click Event Data
export interface ClickEvent extends TelemetryEvent {
  event_type: 'click';
  selector: string;
  x_norm: number; // normalized x coordinate (0-1)
  y_norm: number; // normalized y coordinate (0-1)
  element_text?: string;
  element_type: string;
}

// Hover Event Data
export interface HoverEvent extends TelemetryEvent {
  event_type: 'hover';
  selector: string;
  duration_ms: number;
  x_norm: number;
  y_norm: number;
}

// Scroll Event Data
export interface ScrollEvent extends TelemetryEvent {
  event_type: 'scroll';
  scroll_depth: number; // percentage (0-100)
  scroll_direction: 'up' | 'down';
  scroll_speed: number; // pixels per second
}

// Input Event Data
export interface InputEvent extends TelemetryEvent {
  event_type: 'input';
  field_name: string;
  field_type: string;
  interaction_time_ms: number;
  value_length?: number;
  validation_errors?: string[];
}

// Performance Event Data
export interface PerformanceEvent extends TelemetryEvent {
  event_type: 'performance';
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  page_load_time?: number;
  first_contentful_paint?: number;
  largest_contentful_paint?: number;
  cumulative_layout_shift?: number;
}

// Error Event Data
export interface ErrorEvent extends TelemetryEvent {
  event_type: 'error';
  error_type: string;
  error_message: string;
  stack_trace?: string;
  component_name?: string;
}

// Union type for all events
export type AnyTelemetryEvent = 
  | ClickEvent 
  | HoverEvent 
  | ScrollEvent 
  | InputEvent 
  | PerformanceEvent 
  | ErrorEvent;

import { getClientEnv } from '@/config/env'

class TelemetryManager {
  private sessionId: string;
  private pageId: string;
  private eventQueue: AnyTelemetryEvent[] = [];
  private isEnabled: boolean = getClientEnv().VITE_TELEMETRY_ENABLED ?? true;
  private batchSize: number = 10;
  private flushInterval: number = 5000; // 5 seconds
  private hoverStartTimes: Map<string, number> = new Map();
  private scrollMetrics = {
    lastScrollY: 0,
    lastScrollTime: 0,
    maxScrollDepth: 0
  };

  constructor() {
    this.sessionId = this.generateSessionId();
    this.pageId = this.generatePageId();
    this.initializeEventListeners();
    this.startBatchFlush();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generatePageId(): string {
    return `page_${window.location.pathname.replace(/\//g, '_')}_${Date.now()}`;
  }

  private getViewport() {
    return {
      w: window.innerWidth,
      h: window.innerHeight
    };
  }

  private getNormalizedCoordinates(x: number, y: number) {
    const viewport = this.getViewport();
    return {
      x_norm: Math.round((x / viewport.w) * 100) / 100,
      y_norm: Math.round((y / viewport.h) * 100) / 100
    };
  }

  private getElementSelector(element: Element): string {
    // Generate a unique selector for the element
    if (element.id) return `#${element.id}`;
    if (element.className) {
      const classes = element.className.split(' ').filter(c => c.length > 0);
      if (classes.length > 0) return `.${classes[0]}`;
    }
    return element.tagName.toLowerCase();
  }

  private createBaseEvent(): Omit<TelemetryEvent, 'event_type'> {
    return {
      timestamp: new Date().toISOString(),
      session_id: this.sessionId,
      page_id: this.pageId,
      user_agent: navigator.userAgent,
      viewport: this.getViewport()
    };
  }

  // Track click events
  public trackClick(event: MouseEvent): void {
    if (!this.isEnabled) return;

    const target = event.target as Element;
    const coords = this.getNormalizedCoordinates(event.clientX, event.clientY);
    
    const clickEvent: ClickEvent = {
      ...this.createBaseEvent(),
      event_type: 'click',
      selector: this.getElementSelector(target),
      x_norm: coords.x_norm,
      y_norm: coords.y_norm,
      element_text: target.textContent?.slice(0, 50) || '',
      element_type: target.tagName.toLowerCase()
    };

    this.addEvent(clickEvent);
  }

  // Track hover events
  public trackHoverStart(event: MouseEvent): void {
    if (!this.isEnabled) return;

    const target = event.target as Element;
    const selector = this.getElementSelector(target);
    this.hoverStartTimes.set(selector, Date.now());
  }

  public trackHoverEnd(event: MouseEvent): void {
    if (!this.isEnabled) return;

    const target = event.target as Element;
    const selector = this.getElementSelector(target);
    const startTime = this.hoverStartTimes.get(selector);
    
    if (startTime) {
      const duration = Date.now() - startTime;
      const coords = this.getNormalizedCoordinates(event.clientX, event.clientY);
      
      const hoverEvent: HoverEvent = {
        ...this.createBaseEvent(),
        event_type: 'hover',
        selector,
        duration_ms: duration,
        x_norm: coords.x_norm,
        y_norm: coords.y_norm
      };

      this.addEvent(hoverEvent);
      this.hoverStartTimes.delete(selector);
    }
  }

  // Track scroll events
  public trackScroll(): void {
    if (!this.isEnabled) return;

    const currentScrollY = window.scrollY;
    const currentTime = Date.now();
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollDepth = Math.round((currentScrollY / documentHeight) * 100);

    // Update max scroll depth
    this.scrollMetrics.maxScrollDepth = Math.max(this.scrollMetrics.maxScrollDepth, scrollDepth);

    // Calculate scroll speed
    const timeDiff = currentTime - this.scrollMetrics.lastScrollTime;
    const scrollDiff = Math.abs(currentScrollY - this.scrollMetrics.lastScrollY);
    const scrollSpeed = timeDiff > 0 ? (scrollDiff / timeDiff) * 1000 : 0; // pixels per second

    const scrollEvent: ScrollEvent = {
      ...this.createBaseEvent(),
      event_type: 'scroll',
      scroll_depth: scrollDepth,
      scroll_direction: currentScrollY > this.scrollMetrics.lastScrollY ? 'down' : 'up',
      scroll_speed: Math.round(scrollSpeed)
    };

    this.addEvent(scrollEvent);

    // Update metrics
    this.scrollMetrics.lastScrollY = currentScrollY;
    this.scrollMetrics.lastScrollTime = currentTime;
  }

  // Track input interactions
  public trackInput(fieldName: string, fieldType: string, interactionTime: number, valueLength?: number): void {
    if (!this.isEnabled) return;

    const inputEvent: InputEvent = {
      ...this.createBaseEvent(),
      event_type: 'input',
      field_name: fieldName,
      field_type: fieldType,
      interaction_time_ms: interactionTime,
      value_length: valueLength
    };

    this.addEvent(inputEvent);
  }

  // Track performance metrics
  public trackPerformance(metricName: string, metricValue: number, metricUnit: string): void {
    if (!this.isEnabled) return;

    const performanceEvent: PerformanceEvent = {
      ...this.createBaseEvent(),
      event_type: 'performance',
      metric_name: metricName,
      metric_value: metricValue,
      metric_unit: metricUnit
    };

    this.addEvent(performanceEvent);
  }

  // Track errors
  public trackError(errorType: string, errorMessage: string, stackTrace?: string, componentName?: string): void {
    const errorEvent: ErrorEvent = {
      ...this.createBaseEvent(),
      event_type: 'error',
      error_type: errorType,
      error_message: errorMessage,
      stack_trace: stackTrace,
      component_name: componentName
    };

    this.addEvent(errorEvent);
  }

  // Add event to queue
  private addEvent(event: AnyTelemetryEvent): void {
    this.eventQueue.push(event);
    
    if (this.eventQueue.length >= this.batchSize) {
      this.flushEvents();
    }
  }

  // Flush events to analytics service
  private async flushEvents(): Promise<void> {
    if (this.eventQueue.length === 0) return;

    const events = [...this.eventQueue];
    this.eventQueue = [];

    try {
      if (!this.isEnabled) return;
      const { VITE_API_BASE_URL } = getClientEnv()
      const endpoint = '/api/telemetry/ingest'
      const url = `${VITE_API_BASE_URL || ''}${endpoint}`
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events }),
      })
      if (!res.ok) {
        const stored = JSON.parse(localStorage.getItem('telemetry_events') || '[]');
        stored.push(...events);
        localStorage.setItem('telemetry_events', JSON.stringify(stored.slice(-1000)));
        throw new Error(`Telemetry transport failed: ${res.status}`)
      }
    } catch (error) {
      this.eventQueue.unshift(...events);
    }
  }

  // Start automatic batch flushing
  private startBatchFlush(): void {
    setInterval(() => {
      this.flushEvents();
    }, this.flushInterval);
  }

  // Initialize event listeners
  private initializeEventListeners(): void {
    // Click tracking
    document.addEventListener('click', (e) => this.trackClick(e), { passive: true });

    // Hover tracking
    document.addEventListener('mouseenter', (e) => this.trackHoverStart(e), { capture: true, passive: true });
    document.addEventListener('mouseleave', (e) => this.trackHoverEnd(e), { capture: true, passive: true });

    // Scroll tracking (throttled)
    let scrollTimeout: number;
    document.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => this.trackScroll(), 100);
    }, { passive: true });

    // Performance tracking
    window.addEventListener('load', () => {
      // Track page load performance
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          this.trackPerformance('page_load_time', navigation.loadEventEnd - navigation.fetchStart, 'ms');
          this.trackPerformance('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.fetchStart, 'ms');
        }

        // Track Core Web Vitals if available
        if ('web-vitals' in window) {
          // This would require importing web-vitals library
          // getCLS(metric => this.trackPerformance('cls', metric.value, 'score'));
          // getFID(metric => this.trackPerformance('fid', metric.value, 'ms'));
          // getLCP(metric => this.trackPerformance('lcp', metric.value, 'ms'));
        }
      }, 0);
    });

    // Error tracking
    window.addEventListener('error', (event) => {
      this.trackError('javascript_error', event.message, event.error?.stack, 'global');
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.trackError('promise_rejection', event.reason?.toString() || 'Unknown promise rejection', undefined, 'global');
    });
  }

  // Public methods for manual tracking
  public enable(): void {
    this.isEnabled = true;
  }

  public disable(): void {
    this.isEnabled = false;
  }

  public isTrackingEnabled(): boolean {
    return this.isEnabled;
  }

  // Get telemetry data for debugging
  public getTelemetryData(): AnyTelemetryEvent[] {
    const stored = localStorage.getItem('telemetry_events');
    return stored ? JSON.parse(stored) : [];
  }

  // Clear telemetry data
  public clearTelemetryData(): void {
    localStorage.removeItem('telemetry_events');
    this.eventQueue = [];
  }
}

// Create singleton instance
export const telemetry = new TelemetryManager();

// Convenience functions for common tracking scenarios
export const trackEvent = (eventType: TelemetryEventType, data: any) => {
  switch (eventType) {
    case 'performance':
      telemetry.trackPerformance(data.name, data.value, data.unit);
      break;
    case 'error':
      telemetry.trackError(data.type, data.message, data.stack, data.component);
      break;
    case 'input':
      telemetry.trackInput(data.fieldName, data.fieldType, data.interactionTime, data.valueLength);
      break;
    default:
      console.warn('Unsupported event type for trackEvent:', eventType);
  }
};

// React hook for component-level telemetry
export const useTelemetry = () => {
  return {
    trackClick: telemetry.trackClick.bind(telemetry),
    trackInput: telemetry.trackInput.bind(telemetry),
    trackPerformance: telemetry.trackPerformance.bind(telemetry),
    trackError: telemetry.trackError.bind(telemetry),
    isEnabled: telemetry.isTrackingEnabled(),
    getTelemetryData: telemetry.getTelemetryData.bind(telemetry),
    clearData: telemetry.clearTelemetryData.bind(telemetry)
  };
};

export default telemetry;
