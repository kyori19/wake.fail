export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-8">
      <main className="flex flex-col items-center space-y-8 max-w-md w-full">
        <h1 className="text-2xl font-mono text-center">
          wake.fail
        </h1>
        
        <div className="w-full space-y-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-blue-500 h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: '47%' }}
            />
          </div>
          
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 font-mono">
            Loading...
          </p>
        </div>
        
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </main>
    </div>
  );
}
