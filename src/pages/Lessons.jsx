import { Link } from 'react-router-dom';
import { lessons } from '../data/lessonData';

export default function Lessons() {
  return (
    <div className="flex items-start justify-center p-8 min-h-full">
      <div className="w-full max-w-4xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(99,102,241,0.2)] border border-indigo-500/30 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
            Choose Your Lesson
          </h2>
          <p className="text-slate-400 text-sm">Select a lesson to start practicing</p>
        </div>
        
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/practice?lesson=${lesson.id}`}
              className="block bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all group"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                      {lesson.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lesson.level === 'Beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      lesson.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {lesson.level}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-2">{lesson.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-cyan-400 font-mono">{lesson.keys}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-500">{lesson.estimatedTime}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-500">{lesson.exercises.length} exercises</span>
                  </div>
                </div>
                <div className="ml-4 text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
