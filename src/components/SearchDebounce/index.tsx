import React, { useRef, useState } from 'react'


const SearchDebounce = (props: any) => {
    const [searchTerm, setSearchTerm] = useState('')
    const typingTimeoutRef = useRef<any>(null);

    const {onSubmit}: any = props
    const handleSearchWithDebounce = (e: any) => {
        const value = e.target.value
        setSearchTerm(value);
        if(!onSubmit) return

        if(typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
            const formValue = {
                searchTerm: value
            }
            onSubmit(formValue)
        }, 300) 
    };
  return (
    <form>
        <input type="text" value={searchTerm} onChange={handleSearchWithDebounce} placeholder='Search Product'/>
    </form>
  )
}

export default SearchDebounce