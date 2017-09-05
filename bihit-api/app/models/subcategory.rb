class Subcategory < ActiveRecord::Base
  scope :category_id, -> (category_id) { where category_id: category_id }
  belongs_to :category
  validates :title, presence: true, uniqueness: { scope: :category_id, message: 'Already exists.' }
end
