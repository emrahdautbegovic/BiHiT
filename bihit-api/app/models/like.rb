class Like < ApplicationRecord
  belongs_to :user
  belongs_to :post
  validates :user_id, presence: true
  validates :post_id, presence: true
  scope :user_id, -> (user_id) { where user_id: user_id }
  scope :post_id, -> (post_id) { where post_id: post_id }
end
