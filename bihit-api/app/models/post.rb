class Post < ApplicationRecord
  belongs_to :user
  belongs_to :subcategory
  scope :subcategory_id, -> (subcategory_id) { where subcategory_id: subcategory_id }
  validates :title, presence: true, uniqueness: { scope: :subcategory_id, message: 'Already exists.' }
  validates :short, presence: true
  validates :long, presence: true
  has_many :comments, :dependent => :delete_all
  has_many :likes, :dependent => :delete_all
end
