
export default function HasLogin() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blockchain-dark">
      <div className="relative crypto-card p-8 rounded-lg shadow-xl text-center max-w-sm w-full animate-fade-in">
        {/* The style attribute needs to be a JavaScript object in JSX */}
        <div 
          className="absolute inset-0 rounded-lg" 
          style={{ 
            background: '', 
            filter: 'blur(2px)' 
          }}
        ></div>

        <div className="relative z-10">
          <p className="text-xl md:text-2xl font-general text-white mb-6 text-neon animate-flicker">
            You were logged in.
            <br />
            <span className="block mt-2">Click here to logout</span>
          </p>

          <button className="blockchain-button px-8 py-3 rounded-full text-white font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105">
            Logout Button
          </button>
        </div>
      </div>
    </div>
  );
}