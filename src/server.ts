import Fastify, { FastifyReply } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { TProductRequest, TUserRequest } from './types';

const prisma = new PrismaClient();

export const fastify = Fastify({
  logger: true,
});

await fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Test swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'user', description: 'User related end-points' },
      { name: 'code', description: 'Code related end-points' },
    ],
    definitions: {
      User: {
        type: 'object',
        required: ['id', 'email'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string', format: 'email' },
        },
      },
    },
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header',
      },
    },
  },
});

fastify.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.code(200).send(users);
  } catch (error) {
    console.error(error);
    res.code(500).send('Internal Server Error');
  }
});

fastify.get('/', async (req, res) => {
  return { hello: 'world' };
});

fastify.post('/user', async (req, res) => {
  try {
    const { email, password }: TUserRequest = req.body as TUserRequest;

    if (!email) {
      return res.code(400).send({
        message: 'The e-mail field is required',
      });
    }
    if (!password) {
      return res.code(400).send({
        message: 'The password field is required',
      });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    res.code(201).send({
      message: `The user ${user.email} was created successfully`,
    });
  } catch (error) {
    console.error(error);
    res.code(500).send('Internal Server Error');
  }
});

fastify.put<{ Params: { id: string }; Body: { email: string } }>('/user/:id', async (req, res) => {
  try {
    const userId = parseInt(req?.params?.id, 10);
    const { email } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { id: userId } });

    if (!existingUser) {
      return res.code(404).send('User not found');
    }

    if (!email) {
      return res.code(400).send({
        message: 'The e-mail field is required',
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { email: email },
    });

    res.code(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    res.code(500).send('Internal Server Error');
  }
});

fastify.delete<{ Params: { id: string } }>('/user/:id', async (req, res) => {
  try {
    const userId = parseInt(req?.params?.id, 10);

    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    if (!deletedUser) {
      return res.code(400).send({
        message: 'An error occured while deleting user. Try again.',
      });
    }

    res.code(200).send({
      message: `The user ${deletedUser.email} was deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    res.code(500).send('Internal Server Error');
  }
});

fastify.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    res.code(200).send(products);
  } catch (error) {
    console.error(error);
    res.code(500).send('Internal Server Error');
  }
});

fastify.post<{ Body: TProductRequest }>('/product', async (req, res) => {
  try {
    const { slug, name, price, description, image_alt, image_url } = req.body;

    if (!slug) {
      return res.code(400).send({
        message: 'The slug field is required',
      });
    }
    if (!name) {
      return res.code(400).send({
        message: 'The name field is required',
      });
    }
    if (!price) {
      return res.code(400).send({
        message: 'The price field is required',
      });
    }
    if (!description) {
      return res.code(400).send({
        message: 'The description field is required',
      });
    }
    if (!image_alt) {
      return res.code(400).send({
        message: 'The image_alt field is required',
      });
    }
    if (!image_url) {
      return res.code(400).send({
        message: 'The image_url field is required',
      });
    }

    const product = await prisma.product.create({
      data: {
        slug: slug,
        name: name,
        price: price,
        description: description,
        image_alt: image_alt,
        image_url: image_url,
      },
    });

    res.code(201).send({
      message: `The product ${product.name} was created successfully`,
    });
  } catch (error) {
    console.error(error);
    res.code(500).send('Internal Server Error');
  }
});

const port = parseInt(process.env.API_PORT ?? '8080');

await fastify.ready();
fastify.swagger();

try {
  await fastify.listen({ port: port });

  console.log(`🚀 Server running on ${port}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
