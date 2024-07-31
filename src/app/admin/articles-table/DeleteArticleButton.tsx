"use client"
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import { toast } from 'react-toastify';
interface DeleteArticleButtonProps{
    articleId: number;
}

const DeleteArticleButton = ({articleId}:DeleteArticleButtonProps) => {
    const router = useRouter();
    const deleteArticleHandler = async () => {
        try{
            if(confirm('Are you sure you want to delete Article')){
                await axios.delete(`${DOMAIN}/api/articles/${articleId}`)
                router.refresh()
                toast.success('Article Deleted Successfully')
            }

        }catch(error:any){
          toast.error(error?.response?.data.message)
          console.error(error)
      
        } 
    }
  return (
    <div className="text-white text-center py-1 rounded-lg p-2 px-2  inline-block  bg-red-600  hover:bg-red-800 transition "
 onClick={deleteArticleHandler}
 >
    Delete</div>
  )
}

export default DeleteArticleButton