import Image from 'next/image';

export default function AboutPage() {
  const team = [
    { name: 'Lybov', role: 'Manager', photo: '/images/team/no_foto.jpg' },
    { name: 'Ian', role: 'Developer', photo: '/images/team/no_foto.jpg' },
    { name: 'Andrew', role: 'Developer', photo: '/images/team/no_foto.jpg' },
    { name: 'Igor', role: 'Developer', photo: '/images/team/no_foto.jpg' },
    { name: 'Wisdom', role: 'Developer', photo: '/images/team/no_foto.jpg' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-12">
      {/* Mission */}
      <section>
        <h1 className="text-4xl font-bold mb-4">Our Mission</h1>
        <p className="text-gray-700 text-lg">
          At Ambrosia, our mission is to provide evidence-based therapy solutions
          that are accessible, personalized, and transformative. We aim to empower
          individuals to improve mental health and well-being.
        </p>
      </section>

      {/* Team */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <Image
                src={member.photo}
                alt={member.name}
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
              <h3 className="mt-2 font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
