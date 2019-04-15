import Joi from 'joi';
import { questionCategories, questionStatuses, questionLevels } from '../../models-consts';
import { CustomJoi } from '../../utils/utils';

export const QuestionCategorySchema = Joi.string().valid(questionCategories);

export const QuestionStatusSchema = Joi.string().valid(questionStatuses);

export const QuestionLevelSchema = Joi.string().valid(questionLevels);

export const QuestionSchema = Joi.object({
  id: Joi.number()
    .integer()
    .required(),
  question: Joi.string().required(),
  _categoryId: QuestionCategorySchema.required(),
  _levelId: QuestionLevelSchema.required(),
  _statusId: QuestionStatusSchema.required(),
  acceptedAt: Joi.date().allow(null),
});

export const GetQuestionsRequestSchema = {
  query: Joi.object({
    category: QuestionCategorySchema,
    status: CustomJoi.stringArray().items(questionStatuses),
    level: CustomJoi.stringArray().items(questionLevels),
    limit: Joi.number()
      .integer()
      .optional(),
    offset: Joi.number()
      .integer()
      .optional(),
    orderBy: Joi.string().only('acceptedAt', 'level'),
    order: Joi.string().only('asc', 'desc'),
  }).required(),
};

export const GetQuestionsResponseSchema = Joi.object({
  data: Joi.array()
    .items(QuestionSchema)
    .required(),
  meta: Joi.object({
    total: Joi.number().required(),
  }).optional(),
});

export const GetOneQuestionRequestSchema = {
  params: Joi.object({
    id: Joi.number()
      .integer()
      .required(),
  }).required(),
};

export const GetOneQuestionResponseSchema = Joi.object({
  data: QuestionSchema.required(),
}).required();

export const CreateQuestionRequestPayloadSchema = Joi.object({
  question: Joi.string().required(),
  level: QuestionLevelSchema.required(),
  category: QuestionCategorySchema.required(),
});

export const CreateQuestionRequestSchema = {
  payload: CreateQuestionRequestPayloadSchema.required(),
};

export const CreateQuestionResponseSchema = Joi.object({
  data: QuestionSchema.required(),
}).required();
