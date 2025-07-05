# Echo APIs

## authRouter

- POST /signup ---> done
- POST /login ---> done
- POST /logout ---> done

## profileRouter

- GET /profile/view ---> done
- PATCH /profile/edit ---> done
- PATCH /profile/password ---> done

## connectionRequestRouter

- POST /request/send/:status/:userId ---> Generalised for interested/ignored
- POST /request/send/:interested/:userId ---> done
- POST /request/send/:ignored/:userId. ---> done

- POST /request/reviev/:status/:requestId ---> Generalised for accepted/rejected
- POST /request/review/:accepted/:requestId ---> done
- POST /request/review/:rejected/:requestId ---> done

## userRouter

- GET /user/connections ---> done 
- GET /user/requests/recieved.  ---> done 
- GET /user/feed - Gets all the profiles in batches

Status: ignored, interested, accepted, rejected
