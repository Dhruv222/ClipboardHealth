# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

There are 3 different scenarios that need to be taken care of in this function. And they all arise because of the different types of inputs. Here are they:

1. Event is `falsy`. In this case, we return the literal `"0"` as the result.
2. Event has a `partitionKey` property. In this case, we need the seed the candidate with this value first. Then convert it to `string` if need be. Finally, one last check on length (less than `MAX_PARTITION_KEY_LENGTH`), if this fails, we use the seeded candidate to generate and digest a new hash.
3. In all other cases(event is `truthy` but doesn't have the `partitionKey` property), we simply `JSON.stringify` the event(regardless of type) and use that to generate and digest a new hash.

Things to note:

- I moved the last two checks before return to only the second case as they are satisfied in the other 2 cases. the result of the crypto line is always a string and will always be 128 characters in length. And the first case(`"0"`) also complies with the checks.
- And I moved the `MAX_PARTITION_KEY_LENGTH` to outside the function and exported it so as to make it easier for the tests to use the same value without maintaining it in two files.
