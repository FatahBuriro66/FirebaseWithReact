import React, { useCallback, useEffect, useState } from 'react'
import CreatePost from '../components/forms/CreatePost'
import { Divider, Table } from 'antd'
import { auth, db } from '../configs/firebaseConfig';
import { child, get, getDatabase, limitToLast, onChildAdded, onValue, orderByChild, query, ref } from 'firebase/database';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
]


function Posts() {
  const [posts, setPosts] = useState([])
  const [isFetch, setisFetch] = useState(false)


  useEffect(() => {
    onValue(ref(db, 'posts'), (snap) => {
      let data = Object.values(snap.val())
      let filteredData = data.filter((el) => el.uid === auth.currentUser.uid)
      setPosts([...filteredData])
    })

  }, [isFetch])
  
  
  const handleIsFetch = useCallback(() => {
    setisFetch(prev => !prev)
  }, [])


  return (
    <div>
      <CreatePost handleIsFetch={handleIsFetch} />
      <Divider />
      <Table columns={columns} dataSource={posts} />
    </div>
  )
}

export default Posts