'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Home, Briefcase, Users, FileText, Calendar } from 'lucide-react'
import Image from 'next/image';

function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef([])

  const navigation = [
    {
      name: 'Home',
      icon: (props) => <Image src="/images/home.png" width={40} height={40} alt="Home" {...props} />,
      activeIcon: (props) => <Image src="/images/active-home.png" width={40} height={40} alt="Home Active" {...props} />,
      href: '/admin',
    },
    {
      name: 'Jobs',
      icon: (props) => <Image src="/images/job.png" width={40} height={40} alt="Jobs" {...props} />,
      activeIcon: (props) => <Image src="/images/active-job.png" width={40} height={40} alt="Jobs Active" {...props} />,
      href: '/admin',
    },
    {
      name: 'Candidates',
      icon: (props) => <Image src="/images/candidates.png" width={40} height={40} alt="Candidates" {...props} />,
      activeIcon: (props) => <Image src="/images/active-candidates.png" width={40} height={40} alt="Candidates Active" {...props} />,
      href: '/candidates',
    },
    {
      name: 'Reports',
      icon: (props) => <Image src="/images/projects.png" width={40} height={40} alt="Reports" {...props} />,
      activeIcon: (props) => <Image src="/images/active-projects.png" width={40} height={40} alt="Reports Active" {...props} />,
      href: '/admin',
    },
    {
      name: 'Calendar',
      icon: (props) => <Image src="/images/calender.png" width={40} height={40} alt="Calendar" {...props} />,
      activeIcon: (props) => <Image src="/images/active-calender.png" width={40} height={40} alt="Calendar Active" {...props} />,
      href: '/admin',
    },
  ];


  useEffect(() => {
    const currentIndex = navigation.findIndex((item) => item.href === pathname)
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex)
    }
  }, [pathname, navigation])

  const handleNavigation = (href, index) => (e) => {
    e.preventDefault()
    setActiveIndex(index)
    router.push(href)
  }

  return (
    <>
      <Image
        src="/images/dashboard.png"
        alt="logo"
        width={32}
        height={32}
        className="object-contain"
      />
      <nav className="relative flex flex-col  space-y-2 py-8">
        <div
          className="absolute left-0 w-1.5  bg-yellow-400 rounded-r-lg transition-all duration-300"
          style={{
            top: `${activeIndex * 1}px`,
            height: '64px',
          }}
        />
        {navigation.map((item, index) => {
          const isActive = index === activeIndex
          const IconComponent = isActive ? item.activeIcon : item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={handleNavigation(item.href, index)}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`flex flex-col items-center justify-center p-3 relative rounded-lg transition-all duration-200`}
            >
              <IconComponent className="" />
              <span className={`text-xs mt-2 text-center ${isActive ? 'text-yellow-400 font-bold' : 'text-white'}`}>
                
              </span>
            </a>
          )
        })}
      </nav>
    </>
  )
}

export default Navbar
