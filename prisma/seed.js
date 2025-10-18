import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const cbt = await prisma.therapy.create({
    data: {
      name: "Cognitive Behavioral Therapy (CBT)",
      imageUrl: "https://example.com/images/cbt.jpg",
      description:
        "CBT helps people identify and change negative thought patterns and behaviors.",
      pros: [
        "Proven effectiveness in treating anxiety and depression",
        "Short-term and goal-oriented",
        "Can be combined with medication"
      ],
      cons: [
        "Requires active participation",
        "May not address underlying causes",
        "Can be emotionally challenging"
      ],
      articles: {
        create: [
          {
            title: "Understanding the Mechanisms of CBT",
            summary: "A study exploring how cognitive restructuring impacts emotional regulation.",
            abstract:
              "This article provides an overview of the neurocognitive mechanisms that make CBT effective...",
            authors: "Smith J., Doe A.",
            publishedDate: new Date("2021-06-10"),
            sourceUrl: "https://journals.org/cbt-mechanisms",
            journal: "Journal of Psychology Research"
          },
          {
            title: "Comparing CBT with Other Therapies for Anxiety",
            summary: "A meta-analysis comparing CBT, ACT, and psychodynamic therapy.",
            abstract:
              "The paper analyzes 30 randomized controlled trials comparing the effectiveness of different therapies...",
            authors: "Brown L., Evans R.",
            publishedDate: new Date("2023-01-22"),
            sourceUrl: "https://journals.org/cbt-vs-act",
            journal: "Behavioral Science Review"
          }
        ]
      }
    }
  })

  const mindfulness = await prisma.therapy.create({
    data: {
      name: "Mindfulness-Based Stress Reduction (MBSR)",
      imageUrl: "https://example.com/images/mbsr.jpg",
      description:
        "MBSR is a meditation-based approach designed to reduce stress and improve emotional well-being.",
      pros: [
        "Improves focus and emotional awareness",
        "Reduces chronic pain and anxiety",
        "Encourages self-compassion"
      ],
      cons: [
        "Requires regular practice",
        "May be difficult for beginners",
        "Less structured than CBT"
      ],
      articles: {
        create: [
          {
            title: "The Role of Mindfulness in Stress Reduction",
            summary: "Overview of how mindfulness practices impact stress response systems.",
            authors: "Lee C., Patel K.",
            publishedDate: new Date("2022-03-15"),
            sourceUrl: "https://journals.org/mindfulness-stress",
            journal: "Mindfulness and Health"
          }
        ]
      }
    }
  })

  console.log({ cbt, mindfulness })
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
