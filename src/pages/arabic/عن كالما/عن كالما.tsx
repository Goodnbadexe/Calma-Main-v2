import { motion } from 'framer-motion'
import './عن كالما.css'

export default function ArabicAbout() {
  return (
    <article className="about-page" dir="rtl" lang="ar">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
        انتقل إلى المحتوى الرئيسي
      </a>

      <div className="background-container">
        {/* Hero Section */}
        <header className="title-section" role="banner">
          <motion.h1 
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            id="page-title"
          >
            عن كالما
          </motion.h1>
          
          <motion.h2 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ color: 'var(--color-accent)' }}
          >
            نصنع ملامح الغد
          </motion.h2>
          
          <motion.h3 
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            style={{ color: 'var(--color-primary)' }}
          >
            نقود بهدف ونبني برؤية مستقبلية
          </motion.h3>
          
          <motion.p 
            className="excellence-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            viewport={{ once: true }}
          >
            نطمح أن نكون قوة مؤثرة في مشهد التطوير العقاري بالمملكة العربية السعودية، حيث يلتقي التصميم المدروس بعناية بالرؤية الاستراتيجية في أماكن استثنائية. نبني معالم عمرانية مستدامة تسهم في تشكيل مستقبل المملكة، نحول المساحات إلى قصص، ونخلق بيئات ملهمة تعكس شعور الانتماء والراحة.
          </motion.p>
          
        </header>

        {/* Vision Manifesto Section */}
        <motion.section 
          id="main-content"
          className="py-24 px-6"
          style={{ backgroundColor: 'var(--color-neutral-100)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          dir="rtl"
          aria-labelledby="vision-heading"
          role="main"
        >
          <div className="container mx-auto max-w-6xl rtl-text-center">
            <motion.h2 
              id="vision-heading"
              className="text-4xl md:text-6xl font-bold mb-8 slide-in-right"
              style={{ color: 'var(--color-primary)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              بيان عن رؤيتنا
            </motion.h2>
            
            <motion.h3 
              className="text-2xl md:text-4xl font-semibold mb-6 slide-in-right"
              style={{ color: 'var(--color-accent)', animationDelay: '0.2s' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              التميز في أدق التفاصيل
            </motion.h3>
            
            <motion.p 
              className="text-xl leading-relaxed max-w-4xl mx-auto slide-in-right"
              style={{ color: 'var(--color-neutral-600)', animationDelay: '0.4s' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              نتطلّع إلى مستقبل يلتقي فيه الإبداع المعماري بالتنمية المستدامة، لنُعيد رسم زاويا المشهد المدني في المملكة العربية السعودية.
            </motion.p>
          </div>
        </motion.section>

        {/* Chairman's Message Section */}
        <motion.section 
          className="py-24 px-6"
          style={{ backgroundColor: 'var(--color-primary)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          dir="rtl"
          aria-labelledby="chairman-heading"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div className="text-center mb-16">
              <h2 
                id="chairman-heading"
                className="text-4xl md:text-6xl font-bold mb-8 slide-in-right"
                style={{ color: 'var(--color-neutral-100)' }}
              >
                رسالة رئيس مجلس الإدارة
              </h2>
              
              <h3 
                className="text-2xl md:text-4xl font-semibold mb-12 slide-in-right"
                style={{ color: 'var(--color-accent)', animationDelay: '0.2s' }}
              >
                هنا، 2000 حلم وجد عنوانه
              </h3>
            </motion.div>

            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 text-lg leading-relaxed" style={{ color: 'var(--color-neutral-200)' }}>
                <p className="font-semibold">إلى شركائنا الكرام وسكان مشاريعنا القادمين</p>
                
                <p>
                  عندما أسست كالما لم أطمح إلى بناء شركة تطوير عقاري تقليدية، بل سعيت إلى إحداث تغيير حقيقي في مفهوم إنشاء المساحات خصيصاً المساحات التي تُجسد رؤية، وتُطلق العنان للإمكانات.
                </p>
                
                <p>
                  اليوم وبينما نفخر بإنجاز ٢٨ مشروعاً ناجحًا في مدينتي الرياض و جدة، ندرك جيداً أن القيمة الحقيقية لا تُقاس بالأمتار بل بثقة أكثر من ٢٠٠٠ عائلة اختارت مشاريعنا موطنًا لها.
                </p>
                
                <p>
                  في كالما نضع الموثوقية في صميم كل مشروع، وكل موعد، وكل وعد. وهذا هو ما رسخ مكانتنا ودفعنا للتوسع بثبات في مختلف أنحاء المملكة.
                </p>
                
                <p>
                  نحن لا نبني مباني فحسب، بل نُعيد رسم أسلوب الحياة المدني مع دمج ممارسات الاستدامة التي تتماشى مع أهداف رؤية السعودية 2030. نبني مساحات يشعر فيها الجميع بالانتماء، وتزدهر فيها العائلات والأعمال.
                </p>
                
                <p>
                  كالما اليوم تمثل ذروة التميز العقاري، حيث تلتقي الرؤية الطموحة بأعلى المعايير. نحن لا نبني فقط، بل نرتقي بأنماط الحياة، ونرسم مستقبلًا يُلهم ويصمد.
                </p>
                
                <p className="font-semibold">هذه هي كالما – التزام بالهدوء ينبض بالحياة.</p>
              </div>
              
              <motion.div 
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-xl font-bold" style={{ color: 'var(--color-accent)' }}>مصعب الماجد</p>
                <p className="text-lg" style={{ color: 'var(--color-neutral-300)' }}>رئيس مجلس إدارة كالما</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Leadership Section */}
        <motion.section 
          className="py-24 px-6"
          style={{ backgroundColor: 'var(--color-neutral-100)' }}
          dir="rtl"
          aria-labelledby="leadership-heading"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              className="rtl-text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 
                id="leadership-heading"
                className="text-4xl md:text-6xl font-bold mb-8 slide-in-right"
                style={{ color: 'var(--color-primary)' }}
              >
                القيادة
              </h2>
              
              <h3 
                className="text-2xl md:text-4xl font-semibold mb-6 slide-in-right"
                style={{ color: 'var(--color-accent)', animationDelay: '0.2s' }}
              >
                قيادة طموحة ومتقدمة
              </h3>
              
              <h4 
                className="text-xl md:text-2xl font-medium mb-8 slide-in-right"
                style={{ color: 'var(--color-primary)', animationDelay: '0.4s' }}
              >
                نبني مجتمعات الغد
              </h4>
              
              <p 
                className="text-lg leading-relaxed max-w-4xl mx-auto slide-in-right"
                style={{ color: 'var(--color-neutral-600)', animationDelay: '0.6s' }}
              >
                لا تقتصر القيادة في كالما على إنجاز المشاريع فقط بل تتمثل في الريادة بابتكار حلول معمارية وتقنيات رقمية ترتقي بتجربة التطوير العقاري ككل. يعمل فريق كالما للقيادة بتجسيد التوازن المثالي بين الرؤية المستقبلية والتنفيذ العملي الدقيق.
              </p>
            </motion.div>

            {/* Leadership Pillars */}
            <div className="grid md:grid-cols-2 gap-12 mb-16 rtl-grid-reverse" role="list" aria-label="ركائز القيادة">
              {[
                {
                  title: "مساحات استثنائية... بنيت على رؤية",
                  description: "تتمحور فلسفتنا القيادية على أربعة ركائز أساسية تُشكل منهجنا في كل مشروع وكل قرار استراتيجي."
                },
                {
                  title: "يجمع قادتنا بين خبرة عميقة في السوق ورؤية ابتكارية متقدمة",
                  description: "لضمان أن تتجاوز كل مشاريعنا معايير اليوم، وتُمهّد لإمكانات الغد. ومع أكثر من ٥٠٠ ألف متر مربعاً، تسهم بفاعلية في رسم ملامح المشهد المدن السعودي الحديث."
                },
                {
                  title: "نبتكر بيئات متكاملة، مصممة لحياتك اليومية",
                  description: "من خلال انتشارنا الاستراتيجي في مدن محورية ومحفظة مشاريعنا المتنوعة، يحافظ فريق قيادتنا على خبرة متعددة القطاعات ويُلهم وجهات جديدة تنبض بالرؤية."
                },
                {
                  title: "تصميم منازل سعودية بطابع متفرد",
                  description: "مع أكثر من 700 وحدة سكنية تم تسليمها وتنوع الخيارات السكنية، يحرص فريق القيادة لدينا على أن يتحول كل مشروع إلى وجهة حيوية تنمو فيها المجتمعات."
                }
              ].map((pillar, index) => (
                <motion.div 
                  key={index}
                  className="p-8 rounded-2xl slide-in-right"
                  style={{ 
                    backgroundColor: 'var(--color-neutral-50)', 
                    animationDelay: `${0.2 * (index + 1)}s` 
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  role="listitem"
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 
                    className="text-xl font-bold mb-4"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {pillar.title}
                  </h4>
                  <p 
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--color-neutral-600)' }}
                  >
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: 'var(--color-accent)' }}
              >
                فن التصميم الهادف
              </h3>
              <p 
                className="text-lg leading-relaxed max-w-4xl mx-auto"
                style={{ color: 'var(--color-neutral-600)' }}
              >
                يُشرف فريق قيادتنا على أكثر من 500,000 متر مربع من المساحات الواعدة، لتضمن أن ينبض كل مشروع من مشاريع كالما بروح التقدم والإمكانيات المتجددة. من لحظة وضع الأساس إلى لحظات الافتتاح، نمضي بخطى ثابتة نحو المستقبل، ونواصل ترك بصمتنا على المشهد العمراني في السعودية وخارجها.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Corporate Culture Section */}
        <motion.section 
          className="py-24 px-6"
          style={{ backgroundColor: 'var(--color-primary)' }}
          dir="rtl"
          aria-labelledby="culture-heading"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              className="rtl-text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 
                id="culture-heading"
                className="text-4xl md:text-6xl font-bold mb-8 slide-in-right"
                style={{ color: 'var(--color-neutral-100)' }}
              >
                ثقافة الشركة
              </h2>
              
              <h3 
                className="text-2xl md:text-4xl font-semibold mb-6 slide-in-right"
                style={{ color: 'var(--color-accent)', animationDelay: '0.2s' }}
              >
                مساحات مدروسة، وقيمة تدوم للزمن
              </h3>
              
              <h4 
                className="text-xl md:text-2xl font-medium mb-8 slide-in-right"
                style={{ color: 'var(--color-neutral-200)', animationDelay: '0.4s' }}
              >
                حيث يلتقي الرقي بسكينة المكان
              </h4>
              
              <p 
                className="text-lg leading-relaxed max-w-4xl mx-auto slide-in-right"
                style={{ color: 'var(--color-neutral-200)', animationDelay: '0.6s' }}
              >
                بُنيت ثقافتنا المؤسسية على قناعة راسخة بأن التميّز ليس مجرد نتيجة وإنما أسلوب حياة. فهي ثقافة تحول تجربة التطوير العقاري من مجرد إنشاءات إلى حالة من الطمأنينة حيث يسهم كل فرد من الفريق في بناء مساحات تُلهم وتبقى.
              </p>
            </motion.div>

            {/* Cultural Principles */}
            <div className="space-y-12">
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-center mb-12"
                style={{ color: 'var(--color-accent)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                مبادئنا الثقافية
              </motion.h3>

              {[
                {
                  title: "دقة متقنة في كل ما نقوم به",
                  description: "نؤمن تماماً أن بناء مشاريع متميزة يتطلب اهتمامًا دقيقًا بالجودة في جميع مراحل التطوير. نعتز بثقافتنا التي تُقدر الدقة والاتقان من أول المفهوم التصميمي الأول وحتى لحظة التسليم، لنضمن أن كل تفصيلة تعكس التزامنا العميق بالتميّز."
                },
                {
                  title: "تجارب استثنائية وعلاقات تدوم مدى الحياة",
                  description: "ثقافتنا تضع تجربة العميل في المقام الأول وتُعلي من شأن تقديم حلول مصممة خصيصًا لتلبية احتياجاته. نحن لا نبني علاقات طويلة الأمد مع عملائنا فحسب بل نعزز روح التعاون والاحترام المتبادل داخل فريقنا، مما يخلق بيئة عمل ملهمة تقود تجاه نتائج استثنائية."
                },
                {
                  title: "الريادة المسؤولة لأجل أجيال الغد",
                  description: "الوعي البيئي والانسجام مع رؤية 2030 أولوية أولي في سياسات المؤسسة بالإضافة إلى اعتبارهم قيم ثقافية راسخة توجه قراراتنا اليومية. نحن ملتزمون بتقديم حلول مستدامة تصمد أمام تحديات المستقبل، وتبني ممارسات مسؤولة تعود بالنفع على مجتمعاتنا."
                }
              ].map((principle, index) => (
                <motion.div 
                  key={index}
                  className="p-8 rounded-2xl"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 
                    className="text-xl font-bold mb-4"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {principle.title}
                  </h4>
                  <p 
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--color-neutral-200)' }}
                  >
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Brand Values Section */}
        <motion.section 
          className="py-24 px-6"
          style={{ backgroundColor: 'var(--color-neutral-100)' }}
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-3xl md:text-5xl font-bold mb-8 leading-tight"
                style={{ color: 'var(--color-primary)' }}
              >
                تجربة عقارية ترتقي بالتطوير العقاري إلى معاني الطمأنينة
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "تفاصيل تصنع الفرق",
                  description: "نبني مشاريع متميزة من خلال العناية بالجودة في كل مرحلة من مراحل التطوير."
                },
                {
                  title: "رؤية قيادية",
                  description: "الريادة في تقديم حلول معمارية مبتكرة وتطبيق التقنيات الرقمية للارتقاء بتجربة تطوير العقارات."
                },
                {
                  title: "الرعاية المسؤولة",
                  description: "الالتزام بممارسات واعية بيئيًا وكفاءة استخدام الموارد، بما يتماشى مع أهداف رؤية 2030 البيئية."
                },
                {
                  title: "معايير عالية المستوي",
                  description: "ضمان الشفافية والامتثال من خلال أنظمة رقابة داخلية وحوكمة دقيقة."
                }
              ].map((value, index) => (
                <motion.div 
                  key={index}
                  className="p-8 rounded-2xl"
                  style={{ backgroundColor: 'var(--color-neutral-50)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 
                    className="text-xl font-bold mb-4"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {value.title}
                  </h3>
                  <p 
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--color-neutral-600)' }}
                  >
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Guiding Principles Section */}
        <motion.section 
          className="py-24 px-6"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-4xl md:text-6xl font-bold mb-8"
                style={{ color: 'var(--color-neutral-100)' }}
              >
                المبادئ التوجيهية
              </h2>
              
              <h3 
                className="text-2xl md:text-4xl font-semibold"
                style={{ color: 'var(--color-accent)' }}
              >
                نُتقن التميز ونرسم ملامح المستقبل
              </h3>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  number: "1",
                  title: "التميز في التصميم",
                  points: ["حلول معمارية مبتكرة", "إبداع مستوحى من الطبيعة", "معايير جودة فائقة"],
                  description: "نُقدم الدقة في كل تفصيلة تصميمية"
                },
                {
                  number: "2", 
                  title: "التفرد التقني",
                  points: ["إدارة مشاريع متقدمة", "دمج الابتكار الرقمي", "رقابة جودة شاملة"],
                  description: "نقود من خلال الابتكار التقني"
                },
                {
                  number: "3",
                  title: "تركيز على رضا العميل",
                  points: ["تجربة العملاء الاستثنائية", "تقديم حلول مصمّمة حسب الاحتياج", "بناء علاقات طويلة الأمد"],
                  description: "نضع معيارًا جديدًا لخدمة العملاء"
                },
                {
                  number: "4",
                  title: "التنمية المستدامة", 
                  points: ["الوعي البيئي", "انسجام مع رؤية 2030", "حلول مضمونة في المستقبل"],
                  description: "إدارة الممارسات المستدامة"
                }
              ].map((principle, index) => (
                <motion.div 
                  key={index}
                  className="p-8 rounded-2xl"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4"
                      style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-neutral-900)' }}
                    >
                      {principle.number}
                    </div>
                    <h3 
                      className="text-xl font-bold"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {principle.title}
                    </h3>
                  </div>
                  
                  <ul className="space-y-2 mb-4">
                    {principle.points.map((point, pointIndex) => (
                      <li 
                        key={pointIndex}
                        className="text-sm"
                        style={{ color: 'var(--color-neutral-200)' }}
                      >
                        • {point}
                      </li>
                    ))}
                  </ul>
                  
                  <p 
                    className="text-base font-medium"
                    style={{ color: 'var(--color-neutral-100)' }}
                  >
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <div className="stats-container">
          <div className="stats-grid">
            {[
              { number: "28", label: "مشروع مكتمل", description: "مشاريع عقارية متميزة" },
              { number: "500,000", label: "م²", description: "من الإمكانيات المتاحة" },
              { number: "130,000", label: "م²", description: "مساحة إجمالية مطورة" },
              { number: "77,097", label: "م²", description: "مساحة سكنية فاخرة" },
              { number: "15", label: "سنة خبرة", description: "في التطوير العقاري" },
              { number: "95%", label: "رضا العملاء", description: "معدل الرضا العام" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </motion.div>
            ))}
          </div>


        </div>
      </div>
    </article>
  )
}
