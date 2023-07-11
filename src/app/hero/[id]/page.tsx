import Image from "next/image"
 
async function getHero(heroId:string) {
    const res = await fetch(`http://127.0.0.1:8090/api/collections/dota2heroes/records/${heroId}`)
    const data = await res.json()
    return data 
}

 
export default async function Hero({ params }: any) {

    


    const hero = await getHero(params.id)
    return (
        <> 
            <div className="border-2 border-black">
                <div>{hero.name_loc}</div>
                 
                <Image src={hero.attribute_img} width={25} height={25} alt={hero.name_loc} />


                <Image src={hero.image} width={500} height={500} alt={hero.name_loc} />
                <a href="/">Back</a>

            </div> 
             
        </>
        
    )
   
}