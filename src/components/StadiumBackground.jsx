import React from 'react';

export default function StadiumBackground({ lightsOn = true, floodlightIntensity = 1, showPitch = true }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050508]">
      {/* Stadium Crowd / Stands Silhouette & Atmosphere */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-1000"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 20%, rgba(220, 20, 60, 0.25) 0%, transparent 70%),
                            radial-gradient(circle at 50% 90%, rgba(10, 40, 20, 0.4) 0%, transparent 60%)`
        }}
      />

      {/* Floodlight Beam Left */}
      <div 
        className={`absolute -top-12 -left-12 w-[600px] h-[800px] transition-all duration-1000 origin-top-left pointer-events-none ${
          lightsOn ? 'opacity-40 animate-floodlight-left' : 'opacity-0'
        }`}
        style={{
          background: 'conic-gradient(from 120deg at 0% 0%, rgba(255, 230, 150, 0.35) 0deg, rgba(230, 0, 0, 0.15) 25deg, transparent 45deg)',
          filter: 'blur(30px)',
          transform: `scale(${floodlightIntensity})`
        }}
      />

      {/* Floodlight Beam Right */}
      <div 
        className={`absolute -top-12 -right-12 w-[600px] h-[800px] transition-all duration-1000 origin-top-right pointer-events-none ${
          lightsOn ? 'opacity-40 animate-floodlight-right' : 'opacity-0'
        }`}
        style={{
          background: 'conic-gradient(from 240deg at 100% 0%, transparent 315deg, rgba(230, 0, 0, 0.15) 335deg, rgba(255, 230, 150, 0.35) 360deg)',
          filter: 'blur(30px)',
          transform: `scale(${floodlightIntensity})`
        }}
      />

      {/* Center Stadium Floodlight Glow */}
      <div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] transition-opacity duration-1000 pointer-events-none ${
          lightsOn ? 'opacity-30' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse at top, rgba(255, 215, 0, 0.3) 0%, rgba(230, 0, 0, 0.15) 40%, transparent 80%)',
          filter: 'blur(40px)'
        }}
      />

      {/* Stadium Floodlight Towers (Visual Hardware Lamps) */}
      <div className={`absolute top-3 left-4 md:left-10 flex gap-1.5 transition-all duration-700 ${lightsOn ? 'opacity-100' : 'opacity-20'}`}>
        {[...Array(6)].map((_, i) => (
          <div 
            key={`fl-left-${i}`}
            className="w-2.5 h-3.5 md:w-3.5 md:h-4.5 rounded-sm bg-white shadow-[0_0_15px_#fff,0_0_25px_#ffd700]"
            style={{ animation: lightsOn ? `pulse 2s infinite ${i * 0.2}s` : 'none' }}
          />
        ))}
      </div>

      <div className={`absolute top-3 right-4 md:right-10 flex gap-1.5 transition-all duration-700 ${lightsOn ? 'opacity-100' : 'opacity-20'}`}>
        {[...Array(6)].map((_, i) => (
          <div 
            key={`fl-right-${i}`}
            className="w-2.5 h-3.5 md:w-3.5 md:h-4.5 rounded-sm bg-white shadow-[0_0_15px_#fff,0_0_25px_#e60000]"
            style={{ animation: lightsOn ? `pulse 2s infinite ${i * 0.2}s` : 'none' }}
          />
        ))}
      </div>

      {/* Football Field Turf Texture at Bottom */}
      {showPitch && (
        <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 pointer-events-none opacity-45 overflow-hidden">
          {/* Turf Stripes */}
          <div 
            className="absolute inset-0"
            style={{
              background: `repeating-linear-gradient(
                90deg,
                #071a0d 0px,
                #071a0d 60px,
                #0c2815 60px,
                #0c2815 120px
              )`,
              maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)'
            }}
          />
          {/* Center Circle & Penalty Box lines */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-48 md:w-80 md:h-80 border-2 border-white/20 rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 md:w-[500px] h-24 border-t-2 border-l-2 border-r-2 border-white/25" />
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30" />
        </div>
      )}

      {/* Ambient Red Glow Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 100px rgba(230, 0, 0, 0.15), inset 0 0 40px rgba(0, 0, 0, 0.8)'
        }}
      />
    </div>
  );
}
