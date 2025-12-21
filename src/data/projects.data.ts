export type UnitType = 'villa' | 'floor' | 'townhouse' | 'office'

export interface ProjectEntry {
  id: string
  nameEN: string
  nameAR: string
  unitType: UnitType
  locationEN: string
  locationAR: string
  slugEN: string
  slugAR: string
  assets: {
    imagesGlob: string
    pdfs: { labelEN: string; labelAR: string; path: string }[]
  }
}

export const projectsData: ProjectEntry[] = [
  {
    id: 'one-by-calma-tower',
    nameEN: 'One by Calma Tower',
    nameAR: 'ون باي كالما تاور',
    unitType: 'office',
    locationEN: 'King Salman • Office',
    locationAR: 'ملك سلمان • مكتبي',
    slugEN: 'one-by-calma-tower',
    slugAR: 'ون-باي-كالما-تاور',
    assets: {
      imagesGlob: '/src/assets/Images/Projects/ملك سلمان - مكتبي - One by Calma Tower/Calma Tower Images/*.{png,jpg,jpeg,webp}',
      pdfs: []
    }
  },
  {
    id: 'jn130',
    nameEN: 'JN130 • Al Janadriyah • Floors',
    nameAR: 'حي الجنادرية – أدوار – JN130',
    unitType: 'floor',
    locationEN: 'Al Janadriyah',
    locationAR: 'حي الجنادرية',
    slugEN: 'jn130-floors',
    slugAR: 'جنادرية-أدوار-jn130',
    assets: {
      imagesGlob: '/src/assets/Images/Projects/حي الجنادرية – أدوار – JN130/JN130 الجنادرية - Images/*.{png,jpg,jpeg,webp}',
      pdfs: [
        { labelEN: 'Plans', labelAR: 'المخططات', path: '/src/assets/Images/Projects/حي الجنادرية – أدوار – JN130/JN130 الجنادرية - Models/المخططات.pdf' },
        { labelEN: 'Prices', labelAR: 'الأسعار', path: '/src/assets/Images/Projects/حي الجنادرية – أدوار – JN130/JN130 الجنادرية - Prices.pdf' }
      ]
    }
  },
  {
    id: 'ys190',
    nameEN: 'YS190 • Al Yasmin • Villas',
    nameAR: 'حي الياسمين - فلل - YS190',
    unitType: 'villa',
    locationEN: 'Al Yasmin',
    locationAR: 'حي الياسمين',
    slugEN: 'ys190-villas',
    slugAR: 'الياسمين-فلل-ys190',
    assets: {
      imagesGlob: '/src/assets/Images/Projects/الياسمين/YS190 الياسمين/YS190 اداور الياسمين - Images/*.{png,jpg,jpeg,webp}',
      pdfs: [
        { labelEN: 'Prices', labelAR: 'الأسعار', path: '/src/assets/Images/Projects/الياسمين/YS190 الياسمين/الياسمين فلل - YS190 - Prices.pdf' }
      ]
    }
  },
  {
    id: 'ys200',
    nameEN: 'YS200 • Al Yasmin • Floors',
    nameAR: 'حي الياسـمين - أدوار - YS200',
    unitType: 'floor',
    locationEN: 'Al Yasmin',
    locationAR: 'حي الياسـمين',
    slugEN: 'ys200-floors',
    slugAR: 'الياسمين-أدوار-ys200',
    assets: {
      imagesGlob: '/src/assets/Images/Projects/الياسمين/الياسـمين YS200/الياسـمين YS200 - Images/*.{png,jpg,jpeg,webp}',
      pdfs: [
        { labelEN: 'Models', labelAR: 'المخططات', path: '/src/assets/Images/Projects/الياسمين/الياسـمين YS200/الياسـمين YS200 - Models/الياسمين أدوار - YS200.pdf' },
        { labelEN: 'Prices', labelAR: 'الأسعار', path: '/src/assets/Images/Projects/الياسمين/الياسـمين YS200/الياسمين أدوار - YS200 - Prices.pdf' }
      ]
    }
  },
  {
    id: 'ht210',
    nameEN: 'HT210 • Hittin • Villas',
    nameAR: 'حطين – فلل - HT210',
    unitType: 'villa',
    locationEN: 'Hittin',
    locationAR: 'حطين',
    slugEN: 'ht210-villas',
    slugAR: 'حطين-فلل-ht210',
    assets: {
      imagesGlob: '/src/assets/Images/Projects/حطين/HT210 حطين/HT210 حطين - Images/*.{png,jpg,jpeg,webp}',
      pdfs: [
        { labelEN: 'Profile', labelAR: 'الملف التعريفي', path: '/src/assets/Images/Projects/حطين/HT210 حطين/HT210 حطين - Profile.pdf' },
        { labelEN: 'Prices', labelAR: 'الأسعار', path: '/src/assets/Images/Projects/حطين/HT210 حطين/HT210- حطين-2 - Prices.pdf' }
      ]
    }
  },
  {
    id: 'gh220',
    nameEN: 'GH220 • Al Ghadir • Townhouse/Floors',
    nameAR: 'حي الغدير – تاون هاوس و أدوار - GH220',
    unitType: 'townhouse',
    locationEN: 'Al Ghadir',
    locationAR: 'حي الغدير',
    slugEN: 'gh220-townhouse',
    slugAR: 'الغدير-تاون-هاوس-gh220',
    assets: {
      imagesGlob: '/src/assets/Images/Projects/حي الغدير – تاون هاوس و أدوار - GH220/GH220 الغدير - Images/*.{png,jpg,jpeg,webp}',
      pdfs: [
        { labelEN: 'Prices', labelAR: 'الأسعار', path: '/src/assets/Images/Projects/حي الغدير – تاون هاوس و أدوار - GH220/الغدير - GH220 - Prices.pdf' }
      ]
    }
  },
  {
    id: 'sa230',
    nameEN: 'SA230 • Al Safa • Floors',
    nameAR: 'حي الصفا – أدوار - SA230',
    unitType: 'floor',
    locationEN: 'Al Safa',
    locationAR: 'حي الصفا',
    slugEN: 'sa230-floors',
    slugAR: 'الصفا-أدوار-sa230',
    assets: {
      imagesGlob: '/src/assets/Images/Projects/حي الصفا – أدوار - SA230/SA230 الصفا - Images/*.{png,jpg,jpeg,webp}',
      pdfs: [
        { labelEN: 'Models', labelAR: 'المخططات', path: '/src/assets/Images/Projects/حي الصفا – أدوار - SA230/SA230 الصفا - Model.pdf' },
        { labelEN: 'Prices', labelAR: 'الأسعار', path: '/src/assets/Images/Projects/حي الصفا – أدوار - SA230/SA230 الصفا - Prices.pdf' }
      ]
    }
  },
  {
    id: 'rm240',
    nameEN: 'RM240 • Al Rimal • Floors',
    nameAR: 'حي الرمال - أدوار – RM240',
    unitType: 'floor',
    locationEN: 'Al Rimal',
    locationAR: 'حي الرمال',
    slugEN: 'rm240-floors',
    slugAR: 'الرمال-أدوار-rm240',
    assets: {
      imagesGlob: '/src/assets/Images/Projects/حي الرمال - أدوار – RM240/RM240 الرمال - Images/*.{png,jpg,jpeg,webp}',
      pdfs: [
        { labelEN: 'Models', labelAR: 'المخططات', path: '/src/assets/Images/Projects/حي الرمال - أدوار – RM240/RM240 الرمال - Model.pdf' },
        { labelEN: 'Prices', labelAR: 'الأسعار', path: '/src/assets/Images/Projects/حي الرمال - أدوار – RM240/RM240 الرمال - Prices.pdf' }
      ]
    }
  },
  {
    id: 'nk250',
    nameEN: 'NK250 • Al Nakheel • Townhouse',
    nameAR: 'حي النخيل – تاون هاوس - NK250',
    unitType: 'townhouse',
    locationEN: 'Al Nakheel',
    locationAR: 'حي النخيل',
    slugEN: 'nk250-townhouse',
    slugAR: 'النخيل-تاون-هاوس-nk250',
    assets: {
      imagesGlob: '/src/assets/Images/Projects/حي النخيل – تاون هاوس - NK250/النــخـيل NK250 - Images/*.{png,jpg,jpeg,webp}',
      pdfs: [
        { labelEN: 'Profile', labelAR: 'الملف التعريفي', path: '/src/assets/Images/Projects/حي النخيل – تاون هاوس - NK250/النـخيل NK250 - Profile.pdf' },
        { labelEN: 'Prices', labelAR: 'الأسعار', path: '/src/assets/Images/Projects/حي النخيل – تاون هاوس - NK250/النخيل - NK250 - Prices.pdf' }
      ]
    }
  },
  {
    id: 'ht260',
    nameEN: 'HT260 • Hittin • Townhouse',
    nameAR: 'حطين – تاون هاوس- HT260',
    unitType: 'townhouse',
    locationEN: 'Hittin',
    locationAR: 'حطين',
    slugEN: 'ht260-townhouse',
    slugAR: 'حطين-تاون-هاوس-ht260',
    assets: {
      imagesGlob: '/src/assets/Images/Projects/حطين/HT260 حطين/HT260 ادوار حطين - Images/*.{png,jpg,jpeg,webp}',
      pdfs: [
        { labelEN: 'Prices', labelAR: 'الأسعار', path: '/src/assets/Images/Projects/حطين/HT260 حطين/HT260- حطين - Prices.pdf' }
      ]
    }
  },
  {
    id: 'istiraha-al-majed',
    nameEN: 'Al Majed Retreat • Istiraha',
    nameAR: 'استراحة الماجد',
    unitType: 'villa',
    locationEN: 'Private Retreat',
    locationAR: 'استراحة',
    slugEN: 'istiraha-al-majed',
    slugAR: 'استراحة-الماجد',
    assets: {
      imagesGlob: '/src/assets/Images/Projects/استراحة\u00A0الماجد/*.{png,jpg,jpeg,webp}',
      pdfs: []
    }
  }
]
