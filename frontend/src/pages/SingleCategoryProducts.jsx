import React from 'react'
import { useParams } from 'react-router-dom'

const SingleCategoryProducts = () => {
    const params = useParams();

    console.log("Category :", params.categoryName);
  return (
    <div>SingleCategoryProducts - {params?.categoryName}</div>
  )
}

export default SingleCategoryProducts