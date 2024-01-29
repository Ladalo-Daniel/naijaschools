import React from 'react'
import Pro_Quiz from './Pro_Quiz'
import Pro_Learn from './Pro_Learn'
import Pro_AIGuide from './Pro_AIGuide'

interface Pro_FeatureProps {}

const Pro_FeatureSection: React.FC<Pro_FeatureProps> = () => {
  return (
    <div className='flex-flex-col gap-2'>
      <h2 className="text-3xl text-primary font-semibold underline hidden">Features</h2>

      <Pro_Quiz />
      <Pro_Learn />
      <Pro_AIGuide />
    </div>
  )
}

export default Pro_FeatureSection