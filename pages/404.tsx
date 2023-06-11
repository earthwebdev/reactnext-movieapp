import RootLayouts from '@/components/Layouts';
import Link from 'next/link'

const FourOhFourPage = () => {
  return
      <RootLayouts>
        <h1>404 - Page Not Found</h1>
        <Link href="/">
         
            Go back home
         
        </Link>
      </RootLayouts>
}

export default FourOhFourPage;