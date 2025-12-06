            </span >
          </div >
  <div className="flex flex-wrap gap-2">
    {company.routes.map((route, i) => (
      <span
        key={i}
        className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium bg-white/5 text-gray-400 border border-white/5"
      >
        {route}
      </span>
    ))}
  </div>
        </div >

  {/* Actions */ }
{
  company.isLocked ? (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center">
        <Lock className="w-8 h-8 text-white mb-3" />
        <button
          onClick={() => onUnlock(company.id)}
          className="px-6 py-2 rounded-full bg-white text-background font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          <Unlock className="w-4 h-4" />
          Unlock Details
        </button>
        <p className="text-xs text-white/70 mt-3 font-medium">2 unlocks remaining</p>
      </div>
    </div>
  ) : (
  <div className="flex gap-2">
    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors text-sm font-medium">
      <Eye className="w-4 h-4" />
      View
    </button>
    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors text-sm font-medium">
      <Plus className="w-4 h-4" />
      Track
    </button>
  </div>
)
}
      </div >
    </motion.div >
  );
}
