import React from "react"

function DocItemPage({ params }: { params: { slug: string } }) {
  console.log(params.slug)
  return (
    <div className="py-10">
      <h1 className="capitalize">{params.slug}</h1>
    </div>
  )
}

export default DocItemPage
