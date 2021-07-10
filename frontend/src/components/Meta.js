import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title,description, keywords}) => {
    return (
        <Helmet>
        <title>{title}</title>
        <meta name={keywords} content={description}/>
      </Helmet>
    )
}
Meta.defaultProps = {
    title: 'Welcome to Κατάστημα | Electronics shop',
    description: 'We sell the best products for cheap',
    keywords:'electronics,buy electronics,cheap electronics'
}
export default Meta
