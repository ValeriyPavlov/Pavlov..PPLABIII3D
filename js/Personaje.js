export class Personaje 
{
    constructor(id, nombre, fuerza) 
    {
        try 
        {
            this.id = id;
            this.nombre = nombre;
            this.fuerza = fuerza;
        }
        catch(ex) 
        {
            throw ex;
        }
    }
}