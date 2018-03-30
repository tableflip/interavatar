# Interavatar

> Inter Planetary Recognised Avatar

## Get avatar

`/ipns/interavatar.io/[peerId]` -> (.jpg image)

```js
GET https://interavatar.io/avatar/{peerId}
// -> 303 https://gateway.interavatar.io/ipfs/Qmhash (.jpg image)
```

We `ipfs.files.stat('/interavatar/{peerId}')` to get the hash of the file and then redirect to the gateway to return the contents.

In MVP https://gateway.interavatar.io is a CNAME to https://ipfs.io.

## Create an avatar

```js
PUT https://interavatar.io/avatar/{peerId}
// body - { avatar, password? }
// peerId is a CID
// avatar is a CID
// password is an optional string for changing the avatar
```

Client side, we offer paste CID or upload. Upload will add to local js-ipfs so that we can send the added hash.

We'll use `window.ipfs` if available or download js-ipfs on demand if not.

We should put some restrictions on the file size/type.

* In MVP there is no upload
* In MVP there are no passwords

Server side, we `ipfs.files.cp([payload.avatar, '/interavatar/' + params.peerId])` the file to MFS.

We periodically publish our IPFS node's name to be the hash of the `/interavatar` directory so that avatars can be looked up using IPNS: `/ipns/interavatar.io/[peerId]`.

In MVP we don't publish our name.

## Update an avatar

```js
PATCH https://interavatar.io/avatar/{peerId}
// body - { avatar, password? }
// peerId is a CID
// avatar is a CID
// password is an optional string which must match the password sent with the PUT request
```

In MVP we don't offer update.

## Remove an avatar

> What does this mean on the permanent web?

```js
DELETE https://interavatar.io/avatar/{peerId}
// body - { password? }
// peerId is a CID
// password is an optional string which must match the password sent with the PUT request
```

In MVP we don't offer remove.
