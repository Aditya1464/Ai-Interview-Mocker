import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen h-screen flex items-center justify-center bg-gray-50 py-0 px-0">
      <div className="flex w-full h-full max-w-none bg-white rounded-none shadow-none overflow-hidden">
        <div className="w-full md:w-1/2 h-full p-8 flex items-center justify-center">
          <SignIn />
        </div>
        <div className="hidden md:flex w-1/2 h-full bg-blue-50 flex-col items-center justify-center p-8">
          <h2 className="text-3xl font-bold mb-4 text-blue-700">Welcome to AI Interview Mocker</h2>
          <p className="text-lg text-blue-600 text-center">
            Practice your interviews with AI-generated questions and get instant feedback!
          </p>
        </div>
      </div>
    </div>
  )
}