import { internalMutation } from "./_generated/server";

// Seed: Programming Languages, Linux Distros, LLM Models
export const seedTechCategories = internalMutation({
  args: {},
  handler: async (ctx) => {
    // ─── NEW CATEGORIES ───
    const categories = [
      {
        name: "Programming Languages",
        slug: "programming-languages",
        description: "Rank the most popular programming languages",
        isFeatured: false,
        isTrending: true,
        isHated: false,
      },
      {
        name: "Linux Distros",
        slug: "linux-distros",
        description: "Which Linux distribution reigns supreme?",
        isFeatured: false,
        isTrending: false,
        isHated: false,
      },
      {
        name: "LLM Models",
        slug: "llm-models",
        description: "Rank the best large language models and AI systems",
        isFeatured: true,
        isTrending: true,
        isHated: false,
      },
    ];

    const categoryIds: Record<string, any> = {};
    for (const cat of categories) {
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

    // ─── PROGRAMMING LANGUAGES ───
    const programmingLanguages = [
      { name: "Python", description: "The Swiss army knife of programming. AI/ML, web, scripting — Python does it all.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "JavaScript", description: "The language of the web. Runs everywhere — browsers, servers, even toasters.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", description: "JavaScript but with types. Microsoft's gift to developers who like catching bugs early.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Java", description: "Write once, run anywhere. Enterprise workhorse powering billions of devices.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "C++", description: "High-performance powerhouse. Games, OS kernels, and real-time systems.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "C", description: "The granddaddy of modern programming. Unix, Linux, and embedded systems.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "Rust", description: "Memory safety without garbage collection. The most loved language for years.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" },
      { name: "Go", description: "Google's answer to simple, fast, concurrent programming. Built for the cloud.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
      { name: "C#", description: "Microsoft's elegant language. Unity game dev, .NET, and enterprise apps.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
      { name: "Swift", description: "Apple's modern language for iOS, macOS, and beyond. Fast and expressive.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
      { name: "Kotlin", description: "Modern Android development. Google's preferred language for mobile apps.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
      { name: "Ruby", description: "Developer happiness first. Rails made it famous, startups still love it.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
      { name: "PHP", description: "Powers 77% of the web including WordPress, Facebook's early days, and Laravel.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "Dart", description: "Google's language powering Flutter. Cross-platform mobile development.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
      { name: "Scala", description: "Functional meets object-oriented on the JVM. Big data with Apache Spark.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg" },
      { name: "R", description: "The statistician's language. Data science, visualization, and research.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
      { name: "Lua", description: "Lightweight scripting language embedded in games — Roblox, World of Warcraft.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg" },
      { name: "Elixir", description: "Built on Erlang's VM. Fault-tolerant, distributed, real-time systems.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elixir/elixir-original.svg" },
      { name: "Haskell", description: "Pure functional programming. If you understand monads, you deserve a medal.", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg" },
      { name: "Zig", description: "The new challenger. Low-level control like C but with modern safety features." },
    ];

    // ─── LINUX DISTROS ───
    const linuxDistros = [
      { name: "Ubuntu", description: "The most popular desktop Linux. Beginner-friendly and backed by Canonical." },
      { name: "Fedora", description: "Cutting-edge tech with stability. Red Hat's community-driven showcase." },
      { name: "Arch Linux", description: "'I use Arch btw.' Rolling release, full control, not for the faint of heart." },
      { name: "Debian", description: "The universal operating system. Rock-solid stability, the base for Ubuntu." },
      { name: "Linux Mint", description: "The friendly fork of Ubuntu. Windows refugees' favorite landing spot." },
      { name: "Pop!_OS", description: "System76's gaming and developer-focused distro. Beautiful and functional." },
      { name: "Manjaro", description: "Arch Linux made easy. Rolling release with a safety net." },
      { name: "openSUSE", description: "Tumbleweed (rolling) or Leap (stable). YaST makes admin a breeze." },
      { name: "CentOS / Rocky Linux", description: "Enterprise-grade server OS. RHEL compatibility for free." },
      { name: "Kali Linux", description: "The hacker's toolkit. Penetration testing and security auditing." },
      { name: "NixOS", description: "Declarative system configuration. Reproducible builds taken to the extreme." },
      { name: "EndeavourOS", description: "Arch-based with a friendly installer. The Arch experience without the pain." },
      { name: "Zorin OS", description: "Designed to look and feel like Windows/macOS. Perfect for switchers." },
      { name: "elementary OS", description: "The macOS of Linux. Beautiful design with a curated App Center." },
      { name: "Void Linux", description: "Independent distro with runit init. Minimalist and blazing fast." },
      { name: "Gentoo", description: "Compile everything from source. Maximum customization for power users." },
      { name: "Alpine Linux", description: "Tiny (5MB) security-oriented distro. The king of Docker containers." },
      { name: "Garuda Linux", description: "Arch-based with eye candy. BTRFS snapshots and performance tweaks." },
      { name: "Tails", description: "Privacy-focused live OS. Routes everything through Tor. Edward Snowden approved." },
      { name: "Slackware", description: "The oldest surviving distro (1993). Unix philosophy in its purest form." },
    ];

    // ─── LLM MODELS ───
    const llmModels = [
      { name: "GPT-4o", description: "OpenAI's flagship multimodal model. Text, vision, audio in one model." },
      { name: "GPT-4.1", description: "OpenAI's latest coding and instruction-following powerhouse." },
      { name: "Claude 3.5 Sonnet", description: "Anthropic's balanced model. Excellent reasoning and safety-focused." },
      { name: "Claude 3.5 Opus", description: "Anthropic's most capable model. Deep analysis and complex reasoning." },
      { name: "Gemini 2.5 Pro", description: "Google's frontier 'thinking' model with a 1M token context window." },
      { name: "Gemini 2.5 Flash", description: "Google's fast and efficient model. Great balance of speed and capability." },
      { name: "Llama 4 Scout", description: "Meta's open-weight model. 17B active params with 16 experts." },
      { name: "Llama 3.3 70B", description: "Meta's powerful open-source model. Competitive with GPT-4 class models." },
      { name: "DeepSeek-V3", description: "Chinese lab's cost-efficient powerhouse. 685B total params, MoE architecture." },
      { name: "DeepSeek-R1", description: "Reasoning-focused model rivaling o1. Open-source chain-of-thought." },
      { name: "Mistral Large", description: "Mistral AI's flagship. Strong multilingual and coding capabilities." },
      { name: "Mistral Small 3.1", description: "24B param model punching way above its weight. Runs locally." },
      { name: "Grok-3", description: "xAI's witty model. Trained on Twitter/X data with real-time knowledge." },
      { name: "Qwen 3 235B", description: "Alibaba's multilingual beast. Open-weight and highly competitive." },
      { name: "Gemma 3 27B", description: "Google's lightweight open model. Runs on a single GPU efficiently." },
      { name: "Command R+", description: "Cohere's enterprise RAG model. Optimized for retrieval and business use." },
      { name: "Phi-4", description: "Microsoft's small but mighty model. 14B params outperforming larger models." },
      { name: "Yi-Lightning", description: "01.AI's fast inference model. Excellent Chinese and English capabilities." },
      { name: "Perplexity Sonar", description: "Built for search. Real-time web access with cited, grounded answers." },
      { name: "Codestral", description: "Mistral's code-specialized model. 80+ programming languages supported." },
    ];

    // ─── INSERT ITEMS ───
    let totalItems = 0;

    // Helper function to insert items with dedup
    const insertItems = async (
      catSlug: string,
      items: { name: string; description: string; imageUrl?: string }[]
    ) => {
      const catId = categoryIds[catSlug];
      if (!catId) return;

      const existing = await ctx.db
        .query("items")
        .withIndex("by_category", (q) => q.eq("categoryId", catId))
        .collect();
      const existingNames = new Set(existing.map((i) => i.name));

      for (const item of items) {
        if (!existingNames.has(item.name)) {
          await ctx.db.insert("items", {
            name: item.name,
            description: item.description,
            imageUrl: item.imageUrl,
            categoryId: catId,
            createdBy: "seed",
          });
          totalItems++;
        }
      }
    };

    await insertItems("programming-languages", programmingLanguages);
    await insertItems("linux-distros", linuxDistros);
    await insertItems("llm-models", llmModels);

    return {
      categoriesCreated: categories.length,
      totalItems,
    };
  },
});
