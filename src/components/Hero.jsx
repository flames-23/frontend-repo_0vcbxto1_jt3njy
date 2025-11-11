import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">
        <div className="backdrop-blur-sm/0">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Social Media Analytics, Unified
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl">
            Track engagement, sentiment, audience, and competitors across platforms in real time.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#dashboard" className="px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
              Open Dashboard
            </a>
            <a href="/test" className="px-5 py-3 rounded-lg bg-white text-gray-800 font-semibold shadow hover:shadow-md transition">
              Check Backend
            </a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
    </section>
  )
}
