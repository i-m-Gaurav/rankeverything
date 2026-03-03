import { internalMutation } from "./_generated/server";

export const seedAll = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data
    const existingCategories = await ctx.db.query("categories").collect();
    for (const cat of existingCategories) {
      // Delete items in category
      const items = await ctx.db
        .query("items")
        .withIndex("by_category", (q) => q.eq("categoryId", cat._id))
        .collect();
      for (const item of items) {
        // Delete votes for item
        const votes = await ctx.db
          .query("votes")
          .withIndex("by_item", (q) => q.eq("itemId", item._id))
          .collect();
        for (const vote of votes) {
          await ctx.db.delete(vote._id);
        }
        await ctx.db.delete(item._id);
      }
      await ctx.db.delete(cat._id);
    }

    // ─── CATEGORIES ───
    const categories = [
      {
        name: "Movies",
        slug: "movies",
        description: "Vote for the greatest movies of all time",
        isFeatured: true,
        isTrending: true,
        isHated: false,
      },
      {
        name: "Foods",
        slug: "foods",
        description: "The most delicious foods from around the world",
        isFeatured: true,
        isTrending: false,
        isHated: false,
      },
      {
        name: "Anime",
        slug: "anime",
        description: "The greatest anime series and movies ever made",
        isFeatured: false,
        isTrending: true,
        isHated: false,
      },
      {
        name: "Smartphones",
        slug: "smartphones",
        description: "The best smartphones money can buy",
        isFeatured: true,
        isTrending: false,
        isHated: false,
      },
      {
        name: "Gangsters",
        slug: "gangsters",
        description: "The most notorious gangsters in history and fiction",
        isFeatured: false,
        isTrending: false,
        isHated: false,
      },
      {
        name: "Criminals",
        slug: "criminals",
        description: "The most infamous criminals the world has known",
        isFeatured: false,
        isTrending: false,
        isHated: false,
      },
      {
        name: "NSFW Sites",
        slug: "nsfw-sites",
        description: "The most popular adult websites on the internet",
        isFeatured: false,
        isTrending: true,
        isHated: false,
      },
      {
        name: "Person",
        slug: "person",
        description: "The most influential people in the world",
        isFeatured: false,
        isTrending: false,
        isHated: false,
      },
      {
        name: "Books",
        slug: "books",
        description: "The greatest books ever written",
        isFeatured: false,
        isTrending: true,
        isHated: false,
      },
      {
        name: "War",
        slug: "war",
        description: "The most devastating wars in human history",
        isFeatured: false,
        isTrending: false,
        isHated: true,
      },
      {
        name: "Politics",
        slug: "politics",
        description: "Political figures and movements that shaped the world",
        isFeatured: false,
        isTrending: false,
        isHated: true,
      },
    ];

    const categoryIds: Record<string, any> = {};
    for (const cat of categories) {
      const id = await ctx.db.insert("categories", {
        ...cat,
        createdBy: "seed",
      });
      categoryIds[cat.slug] = id;
    }

    // ─── ITEMS PER CATEGORY ───
    const itemsByCategory: Record<string, { name: string; description: string }[]> = {
      movies: [
        { name: "The Shawshank Redemption", description: "Two imprisoned men bond over years, finding solace and eventual redemption" },
        { name: "The Godfather", description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son" },
        { name: "The Dark Knight", description: "Batman must accept one of the greatest tests to fight injustice" },
        { name: "Pulp Fiction", description: "Various interconnected stories of criminals in Los Angeles" },
        { name: "Inception", description: "A thief who steals secrets through dream-sharing technology" },
        { name: "Interstellar", description: "Explorers travel through a wormhole near Saturn to save humanity" },
        { name: "The Matrix", description: "A computer hacker learns about the true nature of reality" },
        { name: "Fight Club", description: "An insomniac office worker forms an underground fight club" },
        { name: "Forrest Gump", description: "The story of a slow-witted but kind-hearted man from Alabama" },
        { name: "Parasite", description: "A poor family schemes to become employed by a wealthy household" },
        { name: "The Lord of the Rings: Return of the King", description: "Gandalf and Aragorn lead the World of Men against Sauron's army" },
        { name: "Goodfellas", description: "The story of Henry Hill and his life in the mob" },
        { name: "Schindler's List", description: "In German-occupied Poland, Oskar Schindler saves over a thousand Jewish refugees" },
        { name: "Spirited Away", description: "A girl enters a world ruled by gods, witches, and spirits" },
        { name: "Oppenheimer", description: "The story of physicist J. Robert Oppenheimer and the atomic bomb" },
        { name: "Whiplash", description: "A young drummer enrolls at a cutthroat music conservatory" },
        { name: "Gladiator", description: "A former Roman General seeks revenge against the corrupt emperor" },
        { name: "Django Unchained", description: "A freed slave sets out to rescue his wife from a brutal plantation owner" },
        { name: "The Prestige", description: "Two rival magicians engage in a brutal competitive war" },
        { name: "Avengers: Endgame", description: "The remaining Avengers attempt to reverse Thanos's actions" },
      ],
      foods: [
        { name: "Pizza", description: "Italian origin, loved worldwide with endless topping combinations" },
        { name: "Sushi", description: "Japanese artform of vinegared rice with fresh seafood" },
        { name: "Tacos", description: "Mexican street food with endless filling possibilities" },
        { name: "Biryani", description: "Fragrant South Asian rice dish layered with spiced meat" },
        { name: "Ramen", description: "Japanese noodle soup with rich, umami-packed broth" },
        { name: "Burger", description: "The iconic American sandwich that conquered the world" },
        { name: "Pasta", description: "Italian staple in hundreds of shapes and sauces" },
        { name: "Steak", description: "Premium cut of beef, grilled or pan-seared to perfection" },
        { name: "Dim Sum", description: "Chinese bite-sized portions steamed in bamboo baskets" },
        { name: "Pad Thai", description: "Thai stir-fried rice noodles with tamarind sauce" },
        { name: "Croissant", description: "Buttery, flaky French pastry that melts in your mouth" },
        { name: "Fried Chicken", description: "Crispy, golden-brown poultry loved across cultures" },
        { name: "Ice Cream", description: "Frozen dessert that brings joy in every scoop" },
        { name: "Pho", description: "Vietnamese aromatic noodle soup with herbs and meat" },
        { name: "Dosa", description: "South Indian crispy crepe made from fermented rice batter" },
        { name: "Shawarma", description: "Middle Eastern wrap with slow-roasted seasoned meat" },
        { name: "Pani Puri", description: "Indian street food — crispy shells filled with spiced water" },
        { name: "Kebab", description: "Grilled skewered meat popular from Turkey to India" },
        { name: "Chocolate", description: "The world's most beloved sweet treat" },
        { name: "Momos", description: "Himalayan dumplings with spiced meat or veggie filling" },
      ],
      anime: [
        { name: "Attack on Titan", description: "Humanity fights for survival against giant humanoid Titans" },
        { name: "Death Note", description: "A genius student finds a notebook that can kill anyone" },
        { name: "Naruto", description: "A young ninja seeks recognition and dreams of becoming Hokage" },
        { name: "One Piece", description: "A pirate crew searches for the ultimate treasure" },
        { name: "Fullmetal Alchemist: Brotherhood", description: "Two brothers seek the Philosopher's Stone after a failed alchemy experiment" },
        { name: "Dragon Ball Z", description: "Goku and friends defend Earth against powerful villains" },
        { name: "Demon Slayer", description: "A boy fights demons to avenge his family and cure his sister" },
        { name: "One Punch Man", description: "A hero so powerful he defeats everyone with one punch" },
        { name: "My Hero Academia", description: "A boy born without powers in a superhero world" },
        { name: "Jujutsu Kaisen", description: "A high schooler joins a secret organization of sorcerers" },
        { name: "Hunter x Hunter", description: "A boy searches for his father who is a legendary Hunter" },
        { name: "Steins;Gate", description: "A self-proclaimed mad scientist discovers time travel via microwave" },
        { name: "Cowboy Bebop", description: "A crew of bounty hunters chase criminals across the solar system" },
        { name: "Neon Genesis Evangelion", description: "Teenagers pilot giant mechs to save Tokyo-3 from Angels" },
        { name: "Mob Psycho 100", description: "An overpowered psychic boy tries to live a normal life" },
        { name: "Vinland Saga", description: "A young Viking warrior seeks revenge in medieval Europe" },
        { name: "Chainsaw Man", description: "A broke young man merges with a chainsaw devil" },
        { name: "Tokyo Ghoul", description: "A college student becomes half-ghoul after an organ transplant" },
        { name: "Spy x Family", description: "A spy, assassin, and telepath form a fake family" },
        { name: "Code Geass", description: "An exiled prince gains the power to control minds" },
      ],
      smartphones: [
        { name: "iPhone 16 Pro Max", description: "Apple's flagship with A18 Pro chip and titanium design" },
        { name: "Samsung Galaxy S24 Ultra", description: "Samsung's powerhouse with S Pen and AI features" },
        { name: "Google Pixel 9 Pro", description: "Google's AI-first phone with best-in-class camera" },
        { name: "OnePlus 12", description: "Flagship killer with Snapdragon 8 Gen 3" },
        { name: "Samsung Galaxy Z Fold 6", description: "The most refined foldable phone" },
        { name: "iPhone 15", description: "Apple's mainstream phone with Dynamic Island" },
        { name: "Nothing Phone (2)", description: "Unique transparent design with Glyph interface" },
        { name: "Xiaomi 14 Ultra", description: "Leica-powered camera beast from Xiaomi" },
        { name: "Samsung Galaxy Z Flip 6", description: "Compact foldable with FlexWindow" },
        { name: "Google Pixel 8a", description: "Best mid-range phone with 7 years of updates" },
        { name: "OnePlus Nord 4", description: "Metal unibody mid-ranger with flagship feel" },
        { name: "Motorola Razr+", description: "Nostalgic flip phone reimagined for 2024" },
        { name: "iPhone SE", description: "Apple's most affordable iPhone" },
        { name: "Realme GT 6", description: "Budget flagship with flagship-level display" },
        { name: "Sony Xperia 1 VI", description: "Sony's multimedia powerhouse with pro camera" },
      ],
      gangsters: [
        { name: "Al Capone", description: "Chicago's most notorious Prohibition-era crime boss" },
        { name: "Pablo Escobar", description: "Colombian drug lord who built a $30 billion empire" },
        { name: "John Gotti", description: "The Teflon Don who led the Gambino crime family" },
        { name: "Lucky Luciano", description: "Father of modern organized crime in America" },
        { name: "Bugsy Siegel", description: "The gangster who built Las Vegas" },
        { name: "Whitey Bulger", description: "Boston's most feared crime boss and FBI informant" },
        { name: "Meyer Lansky", description: "The Mob's Accountant who built a gambling empire" },
        { name: "Frank Lucas", description: "Harlem drug lord who cut out the middleman" },
        { name: "Griselda Blanco", description: "The Godmother of the Medellín cartel" },
        { name: "Tony Montana (Scarface)", description: "The fictional Cuban drug lord who wanted the world" },
        { name: "Vito Corleone (The Godfather)", description: "The fictional patriarch of the Corleone crime family" },
        { name: "Tommy Shelby (Peaky Blinders)", description: "The fictional Birmingham gang leader" },
        { name: "Dawood Ibrahim", description: "India's most wanted underworld don" },
        { name: "El Chapo", description: "Mexican drug lord who escaped prison twice" },
        { name: "Carlo Gambino", description: "The quiet boss who inspired The Godfather" },
      ],
      criminals: [
        { name: "Jack the Ripper", description: "Unidentified Victorian-era serial killer in London" },
        { name: "Ted Bundy", description: "Charismatic serial killer who confessed to 30 murders" },
        { name: "Charles Manson", description: "Cult leader behind the Tate-LaBianca murders" },
        { name: "Jeffrey Dahmer", description: "The Milwaukee Cannibal who terrorized the 1980s" },
        { name: "Zodiac Killer", description: "Unidentified serial killer who taunted police with ciphers" },
        { name: "John Wayne Gacy", description: "The Killer Clown who buried victims under his house" },
        { name: "Bonnie and Clyde", description: "The most famous criminal couple in American history" },
        { name: "D.B. Cooper", description: "The only unsolved airline hijacking in US history" },
        { name: "H.H. Holmes", description: "America's first documented serial killer with a Murder Castle" },
        { name: "BTK Killer", description: "Dennis Rader terrorized Kansas for decades undetected" },
        { name: "Aileen Wuornos", description: "Female serial killer whose story became the film Monster" },
        { name: "Son of Sam", description: "David Berkowitz terrorized NYC with random shootings" },
        { name: "The Unabomber", description: "Ted Kaczynski's 17-year bombing campaign against technology" },
        { name: "Elizabeth Báthory", description: "The Blood Countess of 16th-century Hungary" },
        { name: "Richard Ramirez", description: "The Night Stalker who terrorized Los Angeles" },
      ],
      "nsfw-sites": [
        { name: "OnlyFans", description: "Creator subscription platform that changed the adult industry" },
        { name: "Pornhub", description: "The YouTube of adult entertainment" },
        { name: "Reddit NSFW", description: "Thousands of communities for every niche" },
        { name: "XVideos", description: "One of the most visited websites in the world" },
        { name: "Chaturbate", description: "Live cam streaming platform" },
        { name: "XNXX", description: "Free streaming site with massive library" },
        { name: "Fansly", description: "OnlyFans alternative with creator-friendly policies" },
        { name: "Twitter/X NSFW", description: "The only mainstream social media allowing adult content" },
        { name: "Brazzers", description: "Premium studio known for high-production content" },
        { name: "Stripchat", description: "Interactive live cam platform" },
      ],
      person: [
        { name: "Elon Musk", description: "CEO of Tesla, SpaceX, and owner of X" },
        { name: "Taylor Swift", description: "Global pop icon and highest-grossing touring artist" },
        { name: "Cristiano Ronaldo", description: "Football legend with the most social media followers" },
        { name: "MrBeast", description: "YouTube's biggest creator known for philanthropic stunts" },
        { name: "Joe Rogan", description: "Podcast king with the most influential talk show" },
        { name: "Narendra Modi", description: "Prime Minister of India and social media powerhouse" },
        { name: "Virat Kohli", description: "Indian cricket legend and global sports icon" },
        { name: "Kim Kardashian", description: "Reality TV mogul turned business empire builder" },
        { name: "Donald Trump", description: "Former and current US President, media lightning rod" },
        { name: "Lionel Messi", description: "Greatest footballer of all time, World Cup winner" },
        { name: "Pewdiepie", description: "Pioneer of YouTube gaming and content creation" },
        { name: "Rihanna", description: "Music icon turned billionaire beauty entrepreneur" },
        { name: "Kylie Jenner", description: "Youngest self-made billionaire via Kylie Cosmetics" },
        { name: "BTS (Jungkook)", description: "K-pop sensation with a massive global fanbase" },
        { name: "Andrew Tate", description: "Controversial internet personality and former kickboxer" },
      ],
      books: [
        { name: "To Kill a Mockingbird", description: "Harper Lee's novel about racial injustice in the American South" },
        { name: "1984", description: "George Orwell's dystopian warning about totalitarian control" },
        { name: "Harry Potter Series", description: "J.K. Rowling's magical world that defined a generation" },
        { name: "The Great Gatsby", description: "F. Scott Fitzgerald's tale of wealth and the American Dream" },
        { name: "Lord of the Rings", description: "Tolkien's epic fantasy that created an entire genre" },
        { name: "Pride and Prejudice", description: "Jane Austen's masterpiece of wit and romance" },
        { name: "The Alchemist", description: "Paulo Coelho's inspiring journey of self-discovery" },
        { name: "Sapiens", description: "Yuval Noah Harari's history of humankind" },
        { name: "Atomic Habits", description: "James Clear's guide to building better habits" },
        { name: "The Art of War", description: "Sun Tzu's ancient treatise on military strategy" },
        { name: "Dune", description: "Frank Herbert's epic sci-fi masterpiece" },
        { name: "Crime and Punishment", description: "Dostoevsky's psychological thriller about guilt" },
        { name: "The Subtle Art of Not Giving a F*ck", description: "Mark Manson's counterintuitive approach to living" },
        { name: "Rich Dad Poor Dad", description: "Robert Kiyosaki's personal finance classic" },
        { name: "The Catcher in the Rye", description: "J.D. Salinger's timeless coming-of-age novel" },
      ],
      war: [
        { name: "World War II", description: "The deadliest conflict in human history (1939-1945)" },
        { name: "World War I", description: "The Great War that reshaped the entire world (1914-1918)" },
        { name: "Vietnam War", description: "America's most controversial and divisive war" },
        { name: "Cold War", description: "Decades of nuclear tension between USA and USSR" },
        { name: "War on Terror", description: "The global military campaign after 9/11" },
        { name: "Russian Invasion of Ukraine", description: "Ongoing conflict that shocked the modern world" },
        { name: "Korean War", description: "The forgotten war that divided a peninsula" },
        { name: "Iraq War", description: "The controversial invasion based on disputed intelligence" },
        { name: "Afghanistan War", description: "America's longest war spanning 20 years" },
        { name: "Syrian Civil War", description: "Devastating multi-sided conflict displacing millions" },
      ],
      politics: [
        { name: "Democracy vs Authoritarianism", description: "The fundamental debate of governance" },
        { name: "Climate Change Policy", description: "The political battle over environmental action" },
        { name: "Immigration Policy", description: "One of the most divisive issues worldwide" },
        { name: "Gun Control", description: "America's never-ending debate on firearms" },
        { name: "Universal Healthcare", description: "Should healthcare be a human right?" },
        { name: "Cryptocurrency Regulation", description: "Governments vs decentralized finance" },
        { name: "AI Regulation", description: "How should governments control artificial intelligence?" },
        { name: "Social Media Censorship", description: "Free speech vs platform responsibility" },
        { name: "Wealth Inequality", description: "The growing gap between rich and poor" },
        { name: "Nuclear Weapons", description: "The existential threat of nuclear proliferation" },
      ],
    };

    let totalItems = 0;
    for (const [slug, items] of Object.entries(itemsByCategory)) {
      const catId = categoryIds[slug];
      if (!catId) continue;
      for (const item of items) {
        await ctx.db.insert("items", {
          name: item.name,
          description: item.description,
          categoryId: catId,
          createdBy: "seed",
        });
        totalItems++;
      }
    }

    return {
      categoriesCreated: categories.length,
      totalItems,
    };
  },
});
