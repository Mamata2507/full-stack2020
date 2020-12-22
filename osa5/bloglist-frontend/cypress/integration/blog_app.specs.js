describe('Blog app ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'tester',
      name: 'John Tester',
      password: 'passu123'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('login to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('passu123')
      cy.get('#login-button').click()

      cy.contains('John Tester logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tester', password: 'passu123' })
    })

    it('a blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('A New Blog')
      cy.get('#author').type('Jane Example')
      cy.get('#url').type('www.jane.com')
      cy.get('#create-blog').click()

      cy.contains('A New Blog Jane Example')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'A New Blog',
          author: 'Jane Example',
          url: 'www.jane.com',
          likes: 0
        })
      })

      it('a blog can be liked', function () {
        cy.contains('A New Blog')
          .contains('view')
          .click()
        cy.contains('like').click()
        cy.contains('A New Blog')
          .contains('likes 1')
      })

      it('a blog can be removed', function () {
        cy.contains('A New Blog')
          .contains('view').click()
        cy.contains('A New Blog')
          .contains('remove').click()
      })
    })

    describe.only('and multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'First Blog',
          author: 'Jane Example',
          url: 'www.first.com',
          likes: 2
        })
        cy.createBlog({
          title: 'Second Blog',
          author: 'John Tester',
          url: 'www.second.com',
          likes: 3
        })
        cy.createBlog({
          title: 'Third Blog',
          author: 'John Tester',
          url: 'www.third.com',
          likes: 0
        })
      })

      it('blogs will be sorted correctly', function() {
        cy.get('.blog').then(blogs => {
          cy.get(blogs[0]).should('contain', 'Second Blog')
          cy.get(blogs[1]).should('contain', 'First Blog')
          cy.get(blogs[2]).should('contain', 'Third Blog')
        })
      })
    })
  })
})

