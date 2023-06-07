import { PopularPersonCardInterface } from '@/interface/peopleinterface';
const PopularPersonCard = ( {name, profile_path, known_for, index}: PopularPersonCardInterface) => {
  return (    
            <div key={`card_$(index)`} className='col-3 mb-2'>
                {profile_path != '' ?<img className='w-full img-fluid' alt={name} src={profile_path} />:''}
                <div className='px-6 py-4 text-black'>
                    <div className='fw-bold text-xl mb-2 name'>{name}</div>
                    <div className='text-gray-700 tet-base mb-2'>                       
                        <div className="sub">
                        { known_for && (
                            known_for.map((movie: any, ind: number) => {
                                return (
                                                                      
                                    <p className='d-inline-block text-wrap me-1 fst-italic'>{movie.title? movie.title: ''} 
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