import { PopularPersonCardInterface } from '@/interface/peopleinterface';
import Link from 'next/link';

const PopularPersonCard = ( {id, name, profile_path, known_for, index}: PopularPersonCardInterface) => {
  return (    
            <div key={`personcard_${index}`} className='col-3 mb-2'>
                {profile_path != '' ?<Link href={`/person/${id}`}><img className='w-full img-fluid' alt={name} src={profile_path} /></Link>:''}
                <div className='px-6 py-4 text-black'>
                    <div className='fw-bold text-xl mb-2 name'><Link href={`/person/${id}`}>{name}</Link></div>
                    <div className='text-gray-700 tet-base mb-2'>                       
                        <div className="sub">
                        { known_for && (
                            known_for.map((movie: any, ind: number) => {
                                return (
                                                                      
                                    <p key={ind} className='d-inline-block text-wrap me-1 fst-italic'>{movie.title? movie.title: ''} 
                                        { ind === known_for.length - 1  ? ' ':' ,'}
                                     </p>
                                )
                            })
                        ) }
                        </div>
                    </div>                    
                </div>
            </div>

        )
}

export default PopularPersonCard