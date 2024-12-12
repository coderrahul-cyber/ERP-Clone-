import { Separator } from "./ui/separator"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SingleDetail = ({keyy , value} : {keyy :string ,value : any}) => {
  return (
    <section className="text-xl text-[#333131] font-kenynarg  my-2   tracking-wide  text-ellipsis ">
      <span className="text-black capitalize text-nowrap">{keyy}: </span>{value}
      <Separator className="separate" />
    </section>
  )
}

export default SingleDetail
