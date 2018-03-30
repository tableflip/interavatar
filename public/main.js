(() => {
  const form = document.querySelector('form')

  form.addEventListener('submit', async e => {
    e.preventDefault()

    const peer = document.querySelector('[name=peer]').value
    const avatar = document.querySelector('[name=avatar]').value

    const res = await window.fetch(`/ipfs/${peer}`, {
      method: 'PUT',
      body: JSON.stringify({ avatar }),
      headers: { 'content-type': 'application/json' }
    })

    if (!res.ok) {
      try {
        console.log(await res.json())
      } catch (err) {
        throw new Error('Unexpected response ' + res.status)
      }
      return
    }

    const { url } = await res.json()

    form.className = 'dn'

    const msg = document.createElement('p')
    msg.innerHTML = `Done! Your avatar is available at ${url}`

    document.body.appendChild(msg)
  })
})()
