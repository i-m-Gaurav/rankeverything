import { internalMutation } from "./_generated/server";

// Seed: Planets, Months, Days, Countries (with flag images)
export const seedNewCategories = internalMutation({
  args: {},
  handler: async (ctx) => {
    // ─── NEW CATEGORIES ───
    const categories = [
      {
        name: "Planets",
        slug: "planets",
        description: "Rank the planets of our solar system",
        isFeatured: true,
        isTrending: false,
        isHated: false,
      },
      {
        name: "Months",
        slug: "months",
        description: "Which month of the year is the best?",
        isFeatured: false,
        isTrending: false,
        isHated: false,
      },
      {
        name: "Days",
        slug: "days",
        description: "What's the best day of the week?",
        isFeatured: false,
        isTrending: false,
        isHated: false,
      },
      {
        name: "Countries",
        slug: "countries",
        description: "Rank the countries of the world",
        isFeatured: true,
        isTrending: true,
        isHated: false,
      },
    ];

    const categoryIds: Record<string, any> = {};
    for (const cat of categories) {
      // Check if category already exists
      const existing = await ctx.db
        .query("categories")
        .withIndex("by_slug", (q) => q.eq("slug", cat.slug))
        .unique();
      if (existing) {
        categoryIds[cat.slug] = existing._id;
        continue;
      }
      const id = await ctx.db.insert("categories", {
        ...cat,
        createdBy: "seed",
      });
      categoryIds[cat.slug] = id;
    }

    // ─── PLANETS ───
    const planets = [
      { name: "Mercury", description: "The smallest planet and closest to the Sun. Extreme temperature swings from -180°C to 430°C." },
      { name: "Venus", description: "The hottest planet with a toxic atmosphere. Often called Earth's 'evil twin'." },
      { name: "Earth", description: "The only known planet with life. Home to 8 billion humans." },
      { name: "Mars", description: "The Red Planet. Top candidate for human colonization with evidence of ancient water." },
      { name: "Jupiter", description: "The largest planet — 1,300 Earths could fit inside. Famous for the Great Red Spot storm." },
      { name: "Saturn", description: "The ringed beauty. Its stunning ring system is made of ice and rock particles." },
      { name: "Uranus", description: "The sideways planet that rotates on its side. An ice giant with 27 known moons." },
      { name: "Neptune", description: "The windiest planet with speeds up to 2,100 km/h. Deep blue color from methane." },
    ];

    // ─── MONTHS ───
    const months = [
      { name: "January", description: "New beginnings, fresh resolutions, and the coldest month in the Northern Hemisphere." },
      { name: "February", description: "The month of love (Valentine's Day) and the shortest month of the year." },
      { name: "March", description: "Spring arrives! Holi, St. Patrick's Day, and cherry blossoms begin to bloom." },
      { name: "April", description: "April showers bring May flowers. Easter, April Fools, and warming weather." },
      { name: "May", description: "Full bloom of spring. Mother's Day celebrations worldwide." },
      { name: "June", description: "Summer kicks off! Longest days, school's out, and wedding season begins." },
      { name: "July", description: "Peak summer. Independence Day fireworks, beach trips, and scorching heat." },
      { name: "August", description: "The last hurrah of summer. Vacations, festivals, and back-to-school prep." },
      { name: "September", description: "Autumn begins. Back to school, cooler air, and pumpkin spice season starts." },
      { name: "October", description: "Halloween, falling leaves, cozy vibes, and the best month for horror fans." },
      { name: "November", description: "Thanksgiving, Diwali, and the transition into holiday season." },
      { name: "December", description: "Christmas, New Year's Eve, snow, and the most festive month of the year." },
    ];

    // ─── DAYS ───
    const days = [
      { name: "Monday", description: "The dreaded start of the work week. Coffee is essential." },
      { name: "Tuesday", description: "Taco Tuesday! The week begins to find its rhythm." },
      { name: "Wednesday", description: "Hump day — halfway through. It's all downhill from here." },
      { name: "Thursday", description: "Almost Friday. The anticipation of the weekend builds." },
      { name: "Friday", description: "TGIF! The gateway to the weekend. Party night begins." },
      { name: "Saturday", description: "The king of days. Sleep in, go out, do whatever you want." },
      { name: "Sunday", description: "Rest and recharge — but the Sunday Scaries creep in by evening." },
    ];

    // ─── COUNTRIES (with flag images from flagcdn.com) ───
    // Using ISO 3166-1 alpha-2 codes for flag URLs
    const countries: { name: string; description: string; imageUrl: string }[] = [
      { name: "United States", description: "The land of the free. World's largest economy and cultural superpower.", imageUrl: "https://flagcdn.com/w320/us.png" },
      { name: "India", description: "World's most populous country. 5,000 years of civilization and incredible diversity.", imageUrl: "https://flagcdn.com/w320/in.png" },
      { name: "United Kingdom", description: "Birthplace of modern democracy, the Beatles, and afternoon tea.", imageUrl: "https://flagcdn.com/w320/gb.png" },
      { name: "Japan", description: "Where ancient tradition meets cutting-edge technology. Anime, sushi, and bullet trains.", imageUrl: "https://flagcdn.com/w320/jp.png" },
      { name: "Germany", description: "Engineering excellence, Oktoberfest, and Europe's economic powerhouse.", imageUrl: "https://flagcdn.com/w320/de.png" },
      { name: "France", description: "The land of romance, haute cuisine, and the Eiffel Tower.", imageUrl: "https://flagcdn.com/w320/fr.png" },
      { name: "Brazil", description: "Carnival, football, the Amazon rainforest, and infectious energy.", imageUrl: "https://flagcdn.com/w320/br.png" },
      { name: "Canada", description: "Maple syrup, hockey, and one of the most livable countries on Earth.", imageUrl: "https://flagcdn.com/w320/ca.png" },
      { name: "Australia", description: "The land Down Under. Beaches, wildlife, and the Great Barrier Reef.", imageUrl: "https://flagcdn.com/w320/au.png" },
      { name: "Italy", description: "The cradle of the Renaissance. Pizza, pasta, and la dolce vita.", imageUrl: "https://flagcdn.com/w320/it.png" },
      { name: "South Korea", description: "K-pop, K-drama, Samsung, and the world's fastest internet.", imageUrl: "https://flagcdn.com/w320/kr.png" },
      { name: "China", description: "The oldest continuous civilization. The Great Wall and economic giant.", imageUrl: "https://flagcdn.com/w320/cn.png" },
      { name: "Russia", description: "The world's largest country by area. Ballet, literature, and harsh winters.", imageUrl: "https://flagcdn.com/w320/ru.png" },
      { name: "Mexico", description: "Vibrant culture, ancient ruins, incredible food, and warm hospitality.", imageUrl: "https://flagcdn.com/w320/mx.png" },
      { name: "Spain", description: "Flamenco, siestas, tapas, and some of the world's best football.", imageUrl: "https://flagcdn.com/w320/es.png" },
      { name: "Turkey", description: "Where East meets West. Istanbul, baklava, and rich Ottoman heritage.", imageUrl: "https://flagcdn.com/w320/tr.png" },
      { name: "Thailand", description: "The Land of Smiles. Street food paradise and stunning temples.", imageUrl: "https://flagcdn.com/w320/th.png" },
      { name: "Switzerland", description: "Chocolate, watches, Alps, and the world's highest quality of life.", imageUrl: "https://flagcdn.com/w320/ch.png" },
      { name: "Netherlands", description: "Windmills, tulips, cycling culture, and progressive values.", imageUrl: "https://flagcdn.com/w320/nl.png" },
      { name: "Sweden", description: "IKEA, ABBA, Nobel Prize, and the Scandinavian dream.", imageUrl: "https://flagcdn.com/w320/se.png" },
      { name: "Norway", description: "Fjords, Northern Lights, oil wealth, and the happiest people.", imageUrl: "https://flagcdn.com/w320/no.png" },
      { name: "New Zealand", description: "Middle-earth in real life. Adventure sports and breathtaking scenery.", imageUrl: "https://flagcdn.com/w320/nz.png" },
      { name: "Argentina", description: "Tango, Messi, steak, and passionate football culture.", imageUrl: "https://flagcdn.com/w320/ar.png" },
      { name: "Egypt", description: "The Pyramids, the Sphinx, and the cradle of ancient civilization.", imageUrl: "https://flagcdn.com/w320/eg.png" },
      { name: "South Africa", description: "Rainbow Nation. Safari wildlife, Table Mountain, and Nelson Mandela.", imageUrl: "https://flagcdn.com/w320/za.png" },
      { name: "Nigeria", description: "Africa's most populous country. Nollywood, music, and entrepreneurial spirit.", imageUrl: "https://flagcdn.com/w320/ng.png" },
      { name: "Singapore", description: "The Lion City. Cleanest country, garden paradise, and food heaven.", imageUrl: "https://flagcdn.com/w320/sg.png" },
      { name: "United Arab Emirates", description: "From desert to luxury skyline. Dubai, Abu Dhabi, and ambition personified.", imageUrl: "https://flagcdn.com/w320/ae.png" },
      { name: "Portugal", description: "Pastéis de nata, surf beaches, and Europe's hidden gem.", imageUrl: "https://flagcdn.com/w320/pt.png" },
      { name: "Greece", description: "Birthplace of democracy, philosophy, and the Olympic Games.", imageUrl: "https://flagcdn.com/w320/gr.png" },
      { name: "Ireland", description: "The Emerald Isle. Guinness, literary giants, and Celtic charm.", imageUrl: "https://flagcdn.com/w320/ie.png" },
      { name: "Iceland", description: "Land of fire and ice. Geysers, glaciers, and the Northern Lights.", imageUrl: "https://flagcdn.com/w320/is.png" },
      { name: "Colombia", description: "Coffee, salsa, magical realism, and a stunning comeback story.", imageUrl: "https://flagcdn.com/w320/co.png" },
      { name: "Indonesia", description: "17,000 islands of paradise. Bali, Komodo dragons, and epic diversity.", imageUrl: "https://flagcdn.com/w320/id.png" },
      { name: "Vietnam", description: "Pho, motorbikes, stunning landscapes, and resilient spirit.", imageUrl: "https://flagcdn.com/w320/vn.png" },
      { name: "Israel", description: "The Holy Land. Innovation hub, ancient history, and complex politics.", imageUrl: "https://flagcdn.com/w320/il.png" },
      { name: "Poland", description: "Phoenix from the ashes. Pierogi, vodka, and growing tech scene.", imageUrl: "https://flagcdn.com/w320/pl.png" },
      { name: "Pakistan", description: "Mountains, cricket, hospitality, and the world's youngest population.", imageUrl: "https://flagcdn.com/w320/pk.png" },
      { name: "Kenya", description: "Safari capital of the world. Marathon champions and Maasai warriors.", imageUrl: "https://flagcdn.com/w320/ke.png" },
      { name: "Nepal", description: "Home of Mount Everest. Temples, trekking, and Himalayan beauty.", imageUrl: "https://flagcdn.com/w320/np.png" },
      { name: "Cuba", description: "Classic cars, cigars, salsa, and revolutionary history.", imageUrl: "https://flagcdn.com/w320/cu.png" },
      { name: "Jamaica", description: "Bob Marley, reggae, Blue Mountain coffee, and island vibes.", imageUrl: "https://flagcdn.com/w320/jm.png" },
      { name: "Finland", description: "Saunas, Santa Claus, Nokia, and the world's best education system.", imageUrl: "https://flagcdn.com/w320/fi.png" },
      { name: "Denmark", description: "LEGO, hygge, Vikings, and consistently ranked happiest country.", imageUrl: "https://flagcdn.com/w320/dk.png" },
      { name: "Saudi Arabia", description: "Guardian of Islam's holiest sites. Oil riches and Vision 2030.", imageUrl: "https://flagcdn.com/w320/sa.png" },
      { name: "Philippines", description: "7,000+ islands of paradise. Warmest people and stunning beaches.", imageUrl: "https://flagcdn.com/w320/ph.png" },
      { name: "Morocco", description: "Marrakech, the Sahara, tagine, and mesmerizing architecture.", imageUrl: "https://flagcdn.com/w320/ma.png" },
      { name: "Peru", description: "Machu Picchu, ceviche, the Andes, and ancient Inca civilization.", imageUrl: "https://flagcdn.com/w320/pe.png" },
      { name: "Ukraine", description: "Resilient spirit, rich culture, and breadbasket of Europe.", imageUrl: "https://flagcdn.com/w320/ua.png" },
      { name: "Bangladesh", description: "World's largest river delta. Garment industry and cricket passion.", imageUrl: "https://flagcdn.com/w320/bd.png" },
    ];

    // ─── INSERT ITEMS ───
    let totalItems = 0;

    // Planets (no image)
    const planetCatId = categoryIds["planets"];
    if (planetCatId) {
      for (const item of planets) {
        const exists = await ctx.db
          .query("items")
          .withIndex("by_category", (q) => q.eq("categoryId", planetCatId))
          .collect();
        if (!exists.find((i) => i.name === item.name)) {
          await ctx.db.insert("items", {
            name: item.name,
            description: item.description,
            categoryId: planetCatId,
            createdBy: "seed",
          });
          totalItems++;
        }
      }
    }

    // Months (no image)
    const monthCatId = categoryIds["months"];
    if (monthCatId) {
      for (const item of months) {
        const exists = await ctx.db
          .query("items")
          .withIndex("by_category", (q) => q.eq("categoryId", monthCatId))
          .collect();
        if (!exists.find((i) => i.name === item.name)) {
          await ctx.db.insert("items", {
            name: item.name,
            description: item.description,
            categoryId: monthCatId,
            createdBy: "seed",
          });
          totalItems++;
        }
      }
    }

    // Days (no image)
    const dayCatId = categoryIds["days"];
    if (dayCatId) {
      for (const item of days) {
        const exists = await ctx.db
          .query("items")
          .withIndex("by_category", (q) => q.eq("categoryId", dayCatId))
          .collect();
        if (!exists.find((i) => i.name === item.name)) {
          await ctx.db.insert("items", {
            name: item.name,
            description: item.description,
            categoryId: dayCatId,
            createdBy: "seed",
          });
          totalItems++;
        }
      }
    }

    // Countries (with flag imageUrl)
    const countryCatId = categoryIds["countries"];
    if (countryCatId) {
      for (const item of countries) {
        const exists = await ctx.db
          .query("items")
          .withIndex("by_category", (q) => q.eq("categoryId", countryCatId))
          .collect();
        if (!exists.find((i) => i.name === item.name)) {
          await ctx.db.insert("items", {
            name: item.name,
            description: item.description,
            imageUrl: item.imageUrl,
            categoryId: countryCatId,
            createdBy: "seed",
          });
          totalItems++;
        }
      }
    }

    return {
      categoriesCreated: categories.length,
      totalItems,
    };
  },
});
