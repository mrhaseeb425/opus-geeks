// FAQ content for the /faqs page and the Home FAQ preview (the five items
// flagged `preview` show on Home, in this order).

export const FAQ_ITEMS = [
  {
    question: "What does Opus Geeks build?",
    answer:
      "Mobile apps, web platforms, UI/UX design and games. We can take a product from scope and prototype through engineering, launch and support, or step in for one stage.",
    preview: true,
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on scope. A focused MVP usually takes 6 to 10 weeks; larger platforms run 3 to 6 months. You get a realistic timeline once we understand your requirements.",
    preview: true,
  },
  {
    question: "Do you work with startups or established companies?",
    answer:
      "Both. We help early-stage founders ship a first product and help larger teams modernize existing platforms, mostly in fintech, healthcare, retail and real estate.",
    preview: true,
  },
  {
    question: "What does your process look like?",
    answer:
      "Four stages: Discover, Design, Build, and Launch and support. You review each stage before the next one starts, so feedback lands before we build, not after.",
    preview: true,
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes. We offer maintenance, monitoring and ongoing feature work, so your product keeps improving after release.",
    preview: true,
  },
  {
    question: "How do we get started?",
    answer:
      "Send us a few details on the Contact page or book a 30-minute call. We'll ask about your goals, then follow up with next steps and a proposal.",
  },
];

export const FAQ_PREVIEW = FAQ_ITEMS.filter((item) => item.preview);
