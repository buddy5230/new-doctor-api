

import express, { Express, Request, Response, NextFunction } from 'express';
import userSchemaVac from '../models/vaccine';

const router = express();

router.route('/his').get(( req:Request, res:Response, next:NextFunction,) => {
  userSchemaVac
    .find()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      //return next(error);
    });
});
router.route('/update/:id').put((req: Request, res: Response, next: NextFunction) => {
  userSchemaVac
    .findByIdAndUpdate(req.params.id, {
      $set: req.body,
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      return next(error);
    });
});
// ลบข้อมูล
router.route('/delete/:id/:id').delete((req, res, next,) => {
  userSchemaVac
    .findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: 'ไม่พบข้อมูลที่ต้องการลบ' });
      }
      res.json({ message: 'ลบข้อมูลเรียบร้อยแล้ว' });
    })
    .catch((error) => {
      return next(error);
    });
});

export default router;
