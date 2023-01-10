import wrapper from './wrapper'

// main function
export default function test (): void {
  before(wrapper)

  it('This is a required placeholder to allow before() to work @contract',
    function () {
      console.log('Mocha should not require this hack IMHO')
    }
  )
}
