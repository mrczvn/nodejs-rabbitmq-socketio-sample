import { Request, Response } from 'express'
import { IController, IHttpRequest } from '../../presentation/helpers/protocols'

export const adaptRoute = (controller: IController) => async (
  req: Request,
  res: Response
) => {
  const httpRequest: IHttpRequest = { body: req.body }

  const { statusCode, body } = await controller.handle(httpRequest)

  if (statusCode >= 200 && statusCode <= 299) {
    return res.status(statusCode).json(body)
  }

  return res.status(statusCode).json({ error: body.message })
}
