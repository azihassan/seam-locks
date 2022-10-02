## Experimental Seam-compatible Door Locks API library

This library is a wrapper around the [Door Locks API](https://docs.seam.co/latest/for-device-manufacturers/creating-a-seam-compatible-door-locks-api)

Usage example :

```typescript
const http = new AxiosClient(
  "https://devicecloud.example.com/",
  "ACCESS_TOKEN_HERE"
);
const client = new LocksClient(http);
const lock = await client.get("1c33d4cf-e178-4c06-8a9a-aadd6dc5a804");

console.log(lock);

/*
displays: {
  lock_id: "1c33d4cf-e178-4c06-8a9a-aadd6dc5a804",
  name: undefined,
  model: "example_model",
  address: "999 Louis Lane, CA, 94110, United States",
  properties: {
    locked: true,
  },
}
*/

if(lock.properties.locked) {
  await client.lock(lock.lock_id);
} else {
  await client.unlock(lock.lock_id);
}
```

More usages can be found in the __tests__ directory.
