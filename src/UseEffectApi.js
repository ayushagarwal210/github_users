import React, { useEffect, useState } from 'react'
import { Card, Tab, Tabs } from 'react-bootstrap'
import { Loading } from './Loading'

export const UseEffectApi = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const getUsers = async () => {
    try {
      setLoading(false)
      const response = await fetch('https://api.github.com/users')
      setUsers(await response.json())
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getUsers()
  }, [])
  if (loading) {
    return <Loading />
  }
  return (
    <>
      <h2 className="text-center m-3">List of github users</h2>
      <div className="row ml-5 text-center">
        {users.map((curElem) => {
          return (
            <div key={curElem.id}>
              <Card style={{ width: '24rem' }} className="container m-5">
                <Card.Img
                  variant="top"
                  src={curElem.avatar_url}
                  className="p-2"
                />
                <Card.Body>
                  <Card.Title>
                    <a href={curElem.url} style={{ color: 'black' }}>
                      {curElem.login}
                    </a>
                  </Card.Title>

                  <Card.Text>
                    <Tabs
                      defaultActiveKey="profile"
                      id="uncontrolled-tab-example"
                    >
                      <Tab eventKey="profile" title="Followers">
                        <p className="mt-4">
                          {curElem.followers_url.length} Followers
                        </p>
                      </Tab>
                      <Tab eventKey="home" title="Following">
                        <p className="mt-4">
                          {curElem.following_url.length} Following
                        </p>
                      </Tab>
                      <Tab eventKey="contact" title="Repository">
                        <p className="mt-4">
                          {curElem.repos_url.length} Repositories
                        </p>
                      </Tab>
                    </Tabs>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )
        })}
      </div>
    </>
  )
}
