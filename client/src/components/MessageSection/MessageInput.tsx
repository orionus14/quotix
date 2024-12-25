import { SendHorizonal } from 'lucide-react'

const MessageInput = () => {
  return (
    <div className='h-20 bg-[#FBF8F9] px-3 border-t border-gray-300 flex items-center relative'>
      <SendHorizonal
        className='absolute top-1/2 -translate-y-1/2 right-6'
        color='#7F7F7F'
      />
      <input
        type="text"
        placeholder='Type your message'
        className='w-full py-3 px-4 rounded-full text-sm border border-gray-300 outline-gray-400'
      />
    </div>
  )
}

export default MessageInput