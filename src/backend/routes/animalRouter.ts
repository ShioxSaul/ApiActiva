import Express from 'express';
import { Animals } from '../types/animal.js';
import { deleteAnimal, getAllAnimals, getAnimalById, newAnimal, updateAnimal } from '../controllers/animalController.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';


const AnimalRouter = Express.Router();

AnimalRouter.get("/", async (req: Express.Request, res: Express.Response) => {
    const result = await getAllAnimals();
    res.json(result);
  });
  
AnimalRouter.get("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {
    const result = await getAnimalById(req.params.id);
    res.send(result);
  });
 
AnimalRouter.post("/", async (req: Express.Request, res: Express.Response) => {
    const Animal: Animals = {animalname: req.body.animalname, breed: req.body.breed, weight: req.body.weight, gender: req.body.gender, ownername: req.body.ownername};
    const result = await newAnimal(Animal);
    res.send(result);
});

AnimalRouter.put("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {
    const Animal: Partial<Animals> = {animalname: req.body.animalname, breed: req.body.breed, weight: req.body.weight, gender: req.body.gender, ownername: req.body.ownername};
    const result = await updateAnimal(req.params.id, Animal);
    res.send(result);
});

AnimalRouter.delete("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {  
   const result = await deleteAnimal(req.params.id);
  let statusCode = 200;
res.send(result);
});

export default AnimalRouter;