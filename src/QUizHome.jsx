//import React, { useEffect, useState } from 'react'
import axios from 'axios';
import React, { useEffect } from 'react';

//const URL = "https://opentdb.com/api.php?amount=5&category=17";

function QUizHome() {
  useEffect(()=> {
    axios.get("https://opentdb.com/api.php?amount=5&category=17")
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h3>Hello to Quiz app</h3>
    </div>
  )
}

export default QUizHome
