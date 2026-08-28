const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">About Afro Sports</h1>
        <p className="text-lg text-gray-600">
          Your premier destination for African and international sports coverage.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          Afro Sports is dedicated to bringing you comprehensive coverage of sports across
          Africa and around the world. From the pitches of the Kenya Premier League to the
          biggest European competitions, we deliver live scores, breaking news, in-depth
          analysis, and everything you need to stay connected with your favorite teams and
          athletes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-primary mb-3">Live Scores</h3>
          <p className="text-gray-600">
            Get real-time updates on live matches across all major sports and leagues.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-primary mb-3">Breaking News</h3>
          <p className="text-gray-600">
            Stay ahead with the latest transfer news, match reports, and sports analysis.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-primary mb-3">African Focus</h3>
          <p className="text-gray-600">
            Deep coverage of African sports, leagues, teams, and athletes on the global stage.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-primary mb-3">Community</h3>
          <p className="text-gray-600">
            Join thousands of sports fans across Africa in discussing the games that matter.
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
        <p className="text-gray-600">
          Have a question, story idea, or feedback? Reach out to our editorial team.
        </p>
        <p className="text-gray-600 mt-2">
          Email: hello@afrosports.com
        </p>
      </div>
    </div>
  )
}

export default About
