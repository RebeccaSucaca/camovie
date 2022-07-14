import { useRouter } from 'next/router';

export default function CustomHeader() {
  const router = useRouter()
  const navigation = [
    { name: '線上訂票', href: '/movies' },
    { name: '會員中心', href: '/memberCenter' },
  ]
  return (
    <>
      <header className="py-0 px-28 h-16 flex justify-between items-center bg-indigo-600">
        <button type="button" onClick={() => router.push("../")} className="text-white tracking-widest flex-1 text-2xl text-start">
          CAMOVIE
        </button>
        {navigation.map((item) => (
          <button key={item.name} type="button" onClick={() => router.push(item.href)} className="text-white tracking-widest	text-end pl-8 font-light hover:font-semibold focus:font-semibold active:font-semibold">
            {item.name}
          </button>
        ))}
      </header>
    </>
  )
}
