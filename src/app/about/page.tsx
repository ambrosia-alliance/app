import Image from "next/image";
import { Target, Layers, Globe } from "lucide-react";

export default function AboutPage() {
  const team = [
    { name: "Liubov", role: "Manager", photo: "/images/team/liubov.jpg" },
    { name: "Ian", role: "Developer", photo: "/images/team/ian.jpg" },
    { name: "Andrew", role: "Developer", photo: "/images/team/andrew.jpg" },
    { name: "Igor", role: "Developer", photo: "/images/team/igor.jpg" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-20">
      {/* Mission Section */}
      <section className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
        {/* Left Column */}
        <div className="flex-1 space-y-8">
          <h1 className="text-5xl font-semibold text-cyan-600 leading-tight">
            Mission: Translate Longevity Research into Action
          </h1>

          <div className="space-y-6 text-gray-700">
            <div className="flex items-start gap-4">
              <Target className="text-cyan-600 w-8 h-8 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Our Core Mission</h3>
                <p>
                  To translate longevity research into safe, actionable individual steps.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Layers className="text-cyan-600 w-8 h-8 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Therapy-First Platform</h3>
                <p>
                  Uniting AI evidence with human oversight for optimal outcomes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Globe className="text-cyan-600 w-8 h-8 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Our Ambition</h3>
                <p>
                  Delivering measurable healthspan gains for millions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Images */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="relative w-120 h-60 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/old_couple_park.jpg"
              alt="Older couple walking in park"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-120 h-60 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/old_couple_ice_cream.jpg"
              alt="Happy elderly couple eating ice cream"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-4xl font-semibold text-cyan-600 mb-10 text-center">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
