class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
  scope :post_id, -> (post_id) { where post_id: post_id }
  validates :tekst, presence: true
  validates :post_id, presence:true
  validates :user_id, presence:true
end
