import React from 'react'
import { Pagination } from 'react-bootstrap'
import {Link} from 'react-router-dom'
const Paginate = ({pages,page,isAdmin = false,keyword = ''}) => {
    return pages > 1 && (
        <Pagination>
            <p>{page} page out of {pages} pages&nbsp;&nbsp;</p>
            <>
            {[...Array(pages).keys()].map(x => (
                // <Pagination.Item active={x+1 === page}>
                    <Link key={x + 1} to={!isAdmin? keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`:`/admin/productlist/${x+1}`}><span className={x + 1 === page ? 'text-white bg-green-400 p-2 rounded':'p-2 rounded bg-green-100'}>{x+1 }</span></Link>
                // </Pagination.Item>
            ))}
            </>
        </Pagination>
    )
}

export default Paginate
