module.exports = class ModelGeneric {
  #Model;
  constructor(model) {
    this.#Model = model;
  }

  async getAll(
    filters = {},
    populateObj = { ref: "", fields: [] },
    sortBy = null,
    sortOrder = "asc",
    page,
    limit,
    fields
  ) {
    const query = this.#Model.find(filters);

    if (populateObj.ref) {
      query.populate(populateObj.ref, populateObj.fields);
    }
    if (sortBy) {
      query.sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 });
    }

    if (page && limit) {
      const skip = (page - 1) * limit;
      query.skip(skip).limit(limit);
    }

    if (fields) {
      const selectedFields = fields.split(",").join(" ");
      query.select(selectedFields);
    }
    return await query;
  }

  async create(data, populateObj = { ref: "", fields: [] }) {
    const instance = new this.#Model(data);
    return await instance.save();
  }

  // get one by ID
  async getById(id, populateObj = { ref: "", fields: [] }) {
    const query = this.#Model.findById(id);

    if (populateObj.ref) {
      query.populate(populateObj.ref, populateObj.fields);
    }

    return await query;
  }

  // Update
  async update(id, data, populateObj = { ref: "", fields: [] }) {
    return await this.#Model.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete
  async delete(id) {
    return await this.#Model.findByIdAndDelete(id);
  }

  async getDoucmnetsCount() {
    return await this.#Model.countDocuments();
  }
};
